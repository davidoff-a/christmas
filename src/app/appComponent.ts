import { Component } from "./core/component";

export class AppComponent extends Component{
  constructor(config: {selector: string, template: string}) {
    super(config);
  }
}

export const appComponent = new AppComponent({
  selector: "body",
  template: `
    <div class="wrapper wrapper_column">
      <header class="header"></header>
      <div class="content"></div>
      <footer class="footer"></footer>
    </div>
  `,
});