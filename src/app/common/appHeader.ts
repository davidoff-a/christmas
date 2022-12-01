import { AppComponent } from "../appComponent";

class AppHeader extends AppComponent {
  constructor(config: {
    selector: string;
    template: string;
    events?: { [keys: string]: string };
  }) {
    super(config);
  }

  onMenuItemClick(event: Event) {
    console.log(event);
  }
}

export const appHeader = new AppHeader({
  selector: ".header",
  template: `
        <div class="container">
          <div class="wrapper">
            <nav class="nav__menu">
              <ul class="nav__list">
                <li class="nav__item active" data-active = "">
                  <a href="#" class="nav__link">
                    <img
                      class="nav__img"
                      src="./assets/tree.svg"
                      alt="Начало игры"
                    />
                  </a>
                </li>
                <li class="nav__item" data-active = "toys">
                  <a href="#toys" class="nav__link">Игрушки</a>
                </li>
                <li class="nav__item" data-active = "trees">
                  <a href="#trees" class="nav__link">Наряди ёлку</a>
                </li>
              </ul>
            </nav>
            <div class="header__info">
              <div>
                <input
                  type="search"
                  class="search"
                  id="searchField"
                  placeholder="Поиск"
                />
              </div>
              <div class="toy-counter">
                <span class="toy-counter__number"> 0 </span>
              </div>
            </div>
          </div>
        </div>
  `,
  events: { "click .nav__list": "onNavMenuItemClick" },
});
