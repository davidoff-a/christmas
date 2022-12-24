import { AppComponent } from '../appComponent';

class AppHomePage extends AppComponent {
  constructor(config: { selector: string; template: string }) {
    super(config);
  }
}

export const appHomePage = new AppHomePage({
  selector: '.content',
  template: `
        <div class="container">
          <div class="wrapper">
            <img
              src="./assets/1.png"
              alt="Ёлочная игрушка - шар"
              class="ball ball1"
            />
            <img
              src="./assets/2.png"
              alt="Ёлочная игрушка - шар"
              class="ball ball2"
            />
            <div class="app">
              <div class="app__invitation">
              Помоги бабушке<br />
              нарядить ёлку
            </div>
            <div class="app__start-btn">
              <a href="#toys">Начать</a>
            </div>
            </div>
          </div>
        </div>
  `,
});
