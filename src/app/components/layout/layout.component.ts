import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { GridsterConfig, GridsterItem, GridsterItemComponent } from 'angular-gridster2';
import { DraggableComponent, LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  @ViewChildren(GridsterItemComponent) gridsters: QueryList<GridsterItemComponent>;

  options: GridsterConfig;

  layout: GridsterItem[] = [];

  components: DraggableComponent[] = [];

  constructor(private readonly layoutService: LayoutService) {
    this.options = this.layoutService.options;
    this.layout = this.layoutService.layout;
    this.components = this.layoutService.components;
  }

  ngOnInit() {}

  addItem() {
    console.log(this.layoutService);
    this.layoutService.addItem();
  }

  removeItem($event: MouseEvent, id: string) {
    $event.preventDefault();
    $event.stopPropagation();
    this.layoutService.deleteItem(id);
    this.layout = this.layoutService.layout;
  }

  dropItem(id: string) {
    this.layoutService.dropItem(id);
  }

  setDropId(id: string) {
    this.layoutService.setDropId(id);
  }

  getComponentRef(id: string): string {
    return this.layoutService.getComponentRef(id);
  }
}
