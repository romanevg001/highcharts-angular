import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { KeyValuePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { weatherLocation, WeatherTypeInfoEnum } from '../weather.model';
import { WeatherStore } from '../state/weather.store';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-top-panel',
  standalone: true,
  templateUrl: './top-panel.component.html',
  providers: [provideNativeDateAdapter(), provideMomentDateAdapter()],
  imports: [
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    KeyValuePipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopPanelComponent {
  private destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);

  weatherLocation = weatherLocation;
  weatherTypeInfoEnum = WeatherTypeInfoEnum;

  form = this.formBuilder.group({
    start_date: moment(),
    end_date: moment().add(5, 'd'),
    location: weatherLocation[0],
    hourly: this.formBuilder.group<any>(
      Object.keys(WeatherTypeInfoEnum).reduce((res, item)=> res = {...res,[item]: true},{})
    ),
  });

  constructor(private weatherStore: WeatherStore) {
    this.weatherStore.update(this.form.value);

    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((el) => {
        console.log(el);
        this.weatherStore.update(el);
      });
  }
}
