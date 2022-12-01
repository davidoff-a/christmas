import { AppComponent } from "../appComponent";

class AppNotFound extends AppComponent {
  constructor(config: { selector: string; template: string }) {
    super(config);
  }
}

export const appNotFound = new AppNotFound({
  selector: ".content",
  template: `
    <div class="container">
      <div class="wrapper wrapper_column wrapper_start" style="margin: 0 auto">
        <h2 class="block__title">Страница не найдена</h2>
        <a href=#>Перейти на главную</a>
      </div>
    </div>
  `,
});
