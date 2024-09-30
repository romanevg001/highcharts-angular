import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { WeatherTypeInfoEnum } from '../weather.model';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { JsonPipe, NgStyle } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonDirective } from '../../directives/mat-button.directive';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    HighchartsChartModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    JsonPipe,
    NgStyle,
    MatTooltipModule,
    MatButtonDirective
  ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnChanges {
  private destroyRef = inject(DestroyRef);
  Highcharts: typeof Highcharts = Highcharts;
  @Input() data!: any[];
  @Input() xAxis!: any[];
  @Input() type!: string;

  colors = [
    '#2caffe',
    '#544fc5',
    '#00e272',
    '#fe6a35',
    '#6b8abc',
    '#d568fb',
    '#2ee0ca',
    '#fa4b42',
    '#feb56a',
    '#91e8e1',
  ];
  updateFlag = false;
  activeColor = new FormControl(
    this.colors[Math.round(Math.random() * this.colors.length)]
  );
  //chartObj: Highcharts.Chart | undefined = undefined;
  chartOptions: Highcharts.Options | undefined = undefined;

  /*   ngOnInit(): void {
        
    this.chartObj = Highcharts.chart('container', {
      chart: {
        type: 'line',
      },
      title: {
        text: this.type ? (WeatherTypeInfoEnum as any)[this.type] : '',
      },
      xAxis: {
        categories: this.xAxis,
      },
      / yAxis: {
          min: 0,
          title: {
              text: 'Numbers'
          },
          stackLabels: {
              enabled: true,
              style: {
                  fontWeight: 'bold',
                  color: ( // theme
                      Highcharts.defaultOptions.title.style &&
                      Highcharts.defaultOptions.title.style.color
                  ) || 'gray'
              }
          }
      }, 
         tooltip: {
          headerFormat: '<b>{point.x}</b><br/>',
          pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
          column: {
              stacking: 'normal',
          }
      }, /

      series: this.data,
    });
  } */

  ngOnChanges(changes: SimpleChanges): void {
    this.chartOptions = {
      title: { text: this.type ? (WeatherTypeInfoEnum as any)[this.type] : '' },
      series: [
        {
          data: this.data,
          type: 'line',
          name: this.type ? (WeatherTypeInfoEnum as any)[this.type] : '',
          color: this.activeColor.value || this.colors[0],
        },
      ],
      xAxis: [
        {
          categories: this.xAxis as any,
        },
      ],
    };
    this.updateFlag = true;

    /*   this.chartObj?.update({
      series: this.data,
    }); */
  }

  constructor() {
    this.activeColor.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((val) => {
        if (this.chartOptions?.series) {
          (this.chartOptions.series[0] as any).color = val;
        }
        this.updateFlag = true;
      });
  }

  switchToBar() {
    console.log('switchToBar')
    if (this.chartOptions?.series) {
      this.chartOptions.series[0].type = 'bar';
    }
  }
}
