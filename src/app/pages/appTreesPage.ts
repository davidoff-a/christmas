import { AppComponent } from "../appComponent";

class AppTreesPage extends AppComponent {
  constructor(config: { selector: string; template: string }) {
    super(config);
  }
}

export const appTreesPage = new AppTreesPage({
  selector: ".content",
  template: `
        <div class="container">
        <div class="wrapper">
            <aside class="side side_left">
              <section class="block">
                <div class="wrapper wrapper_start">
                  <img
                    src="./assets/audio.svg"
                    alt="audio-control"
                    class="control"
                  />
                  <img
                    src="./assets/snowflake.svg"
                    alt="snow-control"
                    class="control"
                  />
                </div>
              </section>
              <section class="block">
                <div class="block__title">Выберите фон</div>
                <div class="wrapper wrapper_wrap wrapper_start">
                  
                </div>
              </section>
              <section class="block">
                <div class="block__title">Выберите ёлку</div>
                <div class="wrapper wrapper_wrap wrapper_start">
                  
                </div>
              </section>
              <section class="block">
                <div class="block__title">Выберите гирлянду</div>
              </section>
            </aside>
            <main class="center">
              <img
                src="./assets/1.png"
                alt="christmas tree"
                class="christmas-tree"
              />
            </main>
            <aside class="side">
              <section class="block">
                <h4 class="block__title">Выберите игрушки</h4>
                <div class="wrapper wrapper_start wrapper_wrap">
                  
                </div>
              </section>
              <section class="block">
                <h4 class="block__title">Вы нарядили</h4>
              </section>
            </aside>
          </div>
          </div>
  `,
});
