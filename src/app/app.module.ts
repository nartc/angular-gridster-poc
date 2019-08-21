import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GridsterModule } from 'angular-gridster2';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as drilldown from 'highcharts/modules/drilldown.src';

import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { Example1Component } from './components/example1/example1.component';
import { Example2Component } from './components/example2/example2.component';
import { LayoutItemDirective } from './directives/layout-item.directive';

@NgModule({
  declarations: [AppComponent, LayoutComponent, Example1Component, Example2Component, LayoutItemDirective],
  imports: [BrowserModule, GridsterModule, ChartModule],
  providers: [{ provide: HIGHCHARTS_MODULES, useFactory: () => [more, drilldown] }],
  bootstrap: [AppComponent],
})
export class AppModule {}
