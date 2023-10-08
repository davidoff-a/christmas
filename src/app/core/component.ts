import { wfm } from '../utils/utils';

interface IComponent {
  selector: string;
  template: string;
  el: HTMLElement | null;
  events?: { [keys: string]: string };
}

export class Component implements IComponent {
  selector: string;

  template: string;

  el: HTMLElement | null;

  events?: { [keys: string]: string };

  constructor(config: { selector: string; template: string; events?: { [keys: string]: string } }) {
    this.selector = config.selector;
    this.template = config.template;
    this.el = null;
    this.events = config.events;
  }

  render() {
    this.el = document.querySelector(this.selector) as HTMLElement;
    if (!this.el) {
      throw new Error(`Component with selector ${this.selector} wasn't found!!!`);
    }
    this.el.innerHTML = this.template;

    // this._initEvents();
  }

  // events(){
  //   return this.events;
  // }

  // private _initEvents(): void {
  //   if (wfm.isUndefined(this.events)) return;
  //   let events = this.events();
  //   Object.keys(events).forEach(key => {})
  // }
}
