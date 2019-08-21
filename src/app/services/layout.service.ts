import { EventEmitter, Injectable } from '@angular/core';
import { GridsterConfig, GridsterItem, GridsterItemComponentInterface } from 'angular-gridster2';
import { UUID } from 'angular2-uuid';

export interface DraggableComponent {
  id: string;
  componentRef: string;
  resizeCallback?: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => void;
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  public options: GridsterConfig;
  public layout: GridsterItem[] = [];

  public components: DraggableComponent[] = [];

  public dropId: string;

  public resizeEvent: EventEmitter<any> = new EventEmitter<any>();
  public gridSizeEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.options = {
      api: {
        resize: () => {
          console.log('resize');
        },
      },
      itemResizeCallback: (item, itemComponent) => {
        this.resizeEvent.emit({ item, itemComponent });
      },
      gridSizeChangedCallback: gridster => {
        this.gridSizeEvent.emit({ gridster, grid: gridster.grid });
      },
      draggable: {
        enabled: true,
      },
      pushItems: true,
      resizable: {
        enabled: true,
      },
      swap: true,
      gridType: 'fixed',
      displayGrid: 'onDrag&Resize',
      defaultItemCols: 12,
      defaultItemRows: 12,
      disableWindowResize: true,
      fixedColWidth: 100,
      fixedRowHeight: 100,
    };
  }

  public addItem(): void {
    this.layout.push({
      cols: 5,
      id: UUID.UUID(),
      rows: 5,
      x: 0,
      y: 0,
    });
  }

  public setDropId(id: string): void {
    this.dropId = id;
  }

  public dropItem(id: string): void {
    const comp = this.components.find(c => c.id === id);
    const idx = comp ? this.components.indexOf(comp) : this.components.length;
    const compItem = {
      id: this.dropId,
      componentRef: id,
    };
    this.components = Object.assign([], this.components, { [idx]: compItem });
  }

  public getComponentRef(id: string): string {
    const comp = this.components.find(c => c.id === id);
    return comp ? comp.componentRef : null;
  }

  public deleteItem(id: string): void {
    this.layout = this.layout.filter(item => item.id !== id);
    this.components = this.components.filter(c => c.id !== id);
  }
}
