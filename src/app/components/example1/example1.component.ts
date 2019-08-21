import { Component, OnInit } from '@angular/core';
import { Options } from 'highcharts';
import { Chart } from 'angular-highcharts';
import { throttleTime } from 'rxjs/operators';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-example1',
  templateUrl: './example1.component.html',
  styleUrls: ['./example1.component.scss'],
})
export class Example1Component implements OnInit {
  chart: Chart;
  options: Options = {
    chart: {
      type: 'pie',
      reflow: true,
    },
    title: {
      text: 'Browser market shares. January, 2018',
    },
    subtitle: {
      text:
        'Click the slices to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>',
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.y:.1f}%',
        },
      },
    },

    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
    },

    series: [
      {
        name: 'Browsers',
        type: 'pie',
        colorByPoint: true,
        data: [
          {
            name: 'Chrome',
            y: 62.74,
            drilldown: 'Chrome',
          },
          {
            name: 'Firefox',
            y: 10.57,
            drilldown: 'Firefox',
          },
          {
            name: 'Internet Explorer',
            y: 7.23,
            drilldown: 'Internet Explorer',
          },
          {
            name: 'Safari',
            y: 5.58,
            drilldown: 'Safari',
          },
          {
            name: 'Edge',
            y: 4.02,
            drilldown: 'Edge',
          },
          {
            name: 'Opera',
            y: 1.92,
            drilldown: 'Opera',
          },
          {
            name: 'Other',
            y: 7.62,
            drilldown: null,
          },
        ],
      },
    ],
    drilldown: {
      series: [
        {
          name: 'Chrome',
          id: 'Chrome',
          type: 'pie',
          data: [
            ['v65.0', 0.1],
            ['v64.0', 1.3],
            ['v63.0', 53.02],
            ['v62.0', 1.4],
            ['v61.0', 0.88],
            ['v60.0', 0.56],
            ['v59.0', 0.45],
            ['v58.0', 0.49],
            ['v57.0', 0.32],
            ['v56.0', 0.29],
            ['v55.0', 0.79],
            ['v54.0', 0.18],
            ['v51.0', 0.13],
            ['v49.0', 2.16],
            ['v48.0', 0.13],
            ['v47.0', 0.11],
            ['v43.0', 0.17],
            ['v29.0', 0.26],
          ],
        },
        {
          name: 'Firefox',
          id: 'Firefox',
          type: 'pie',
          data: [
            ['v58.0', 1.02],
            ['v57.0', 7.36],
            ['v56.0', 0.35],
            ['v55.0', 0.11],
            ['v54.0', 0.1],
            ['v52.0', 0.95],
            ['v51.0', 0.15],
            ['v50.0', 0.1],
            ['v48.0', 0.31],
            ['v47.0', 0.12],
          ],
        },
        {
          name: 'Internet Explorer',
          id: 'Internet Explorer',
          type: 'pie',
          data: [['v11.0', 6.2], ['v10.0', 0.29], ['v9.0', 0.27], ['v8.0', 0.47]],
        },
        {
          name: 'Safari',
          id: 'Safari',
          type: 'pie',
          data: [['v11.0', 3.39], ['v10.1', 0.96], ['v10.0', 0.36], ['v9.1', 0.54], ['v9.0', 0.13], ['v5.1', 0.2]],
        },
        {
          name: 'Edge',
          id: 'Edge',
          type: 'pie',
          data: [['v16', 2.6], ['v15', 0.92], ['v14', 0.4], ['v13', 0.1]],
        },
        {
          name: 'Opera',
          id: 'Opera',
          type: 'pie',
          data: [['v50.0', 0.96], ['v49.0', 0.82], ['v12.1', 0.14]],
        },
      ],
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
        },
      ],
    },
  };

  constructor(private readonly layoutService: LayoutService) {}

  ngOnInit() {
    this.layoutService.resizeEvent.subscribe(data => {
      console.log(data);
      const { itemComponent } = data;
      if (this.chart) {
        this.chart.ref.setSize(itemComponent.width * 0.8, itemComponent.height * 0.8);
      }
    });

    this.layoutService.gridSizeEvent.pipe(throttleTime(1000)).subscribe(data => {
      console.log('test', data);
      const { grid } = data;
      if (this.chart) {
        this.chart.ref.setSize(grid[0].width * 0.8, grid[0].height * 0.8);
      }
    });
    this.chart = new Chart(this.options);
  }
}
