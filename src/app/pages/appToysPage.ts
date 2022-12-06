import * as events from 'events';
import { AppComponent } from '../appComponent';
import data from '../../data';
import { Card } from '../components/cards';

interface DataToy {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean
}

class AppToysPage extends AppComponent {
  toysData:DataToy[];

  constructor(config: { selector: string; template: string }, toysData:DataToy[] = data) {
    super(config);
    this.toysData = toysData;
  }

  render(): void {
    this.el = document.querySelector(this.selector) as HTMLElement;
    if (!this.el) {
      throw new Error(`Component with selector ${this.selector} wasn't found!!!`);
    } else {
      this.el.innerHTML = this.template;
    }

    const $cardsContainer: HTMLElement = document.querySelector('.cards') as HTMLElement;
    if ($cardsContainer instanceof HTMLElement) {
      this.toysData.forEach((toy) => {
        const card = new Card(toy);
        card.render(card.createCard(), '.cards');
      });
    }
    const listOfFilters = document.querySelectorAll('.filter__list');
    Array.from(listOfFilters).map((item) => item.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;

      if (target.closest('li') && target.closest('.filter__item')) {
        const tClosest = target.closest('.filter__item') as HTMLElement;
        tClosest ? tClosest.classList.toggle('active') : '';
      }
    }));
  }
}

export const appToysPage = new AppToysPage({
  selector: '.content',
  template: `
        <div class="container">
        <div class="wrapper">
          <aside class="controls">
            <article class="block">
              <h3 class="block__title">Фильтры</h3>
              <section class="filter">
                <h4 class="filter__title">Форма: </h4>
                <ul class="filter__list shapes">
                  <li class="filter__item" data-shape="шар">
                    <img src="./assets/ball.svg" alt="ball" title="Украшения в форме шара" />
                  </li>
                  <li class="filter__item" data-shape="колокол">
                    <img src="./assets/bell.svg" alt="bell" title="Украшения в форме колокольчика" />
                  </li>
                  <li class="filter__item" data-shape="шишка">
                    <img src="./assets/cone.svg" alt="cone" title="Украшения в форме шишки" />
                  </li>
                  <li class="filter__item" data-shape="снежинка">
                    <img src="./assets/snowflake.svg" alt="snow" title="Украшения в форме снежинки" />
                  </li>
                  <li class="filter__item" data-shape="фигурка">
                    <img src="./assets/toy.svg" alt="toy" title="Украшения в форме игрушки" />
                  </li>
                </ul>
              </section>
              <section class="filter">
                <h4 class="filter__title">Цвет: </h4>
                <ul class="filter__list colors">
                  <li class="filter__item" data-color="белый">
                    <div class="filter__color white">

                    </div>
                  </li>
                  <li class="filter__item" data-color="желтый">
                    <div class="filter__color yellow">

                    </div>
                  </li>
                  <li class="filter__item" data-color="красный">
                    <div class="filter__color red">

                    </div>
                  </li>
                  <li class="filter__item" data-color="синий">
                    <div class="filter__color blue">

                    </div>
                  </li>
                  <li class="filter__item" data-color="зелёный">
                    <div class="filter__color green">
                    </div>
                  </li>
                </ul>
              </section>
              <section class="filter">
                <h4 class="filter__title">Размер: </h4>
                <ul class="filter__list sizes">
                  <li class="filter__item large" data-size="большой">
                    <img src="./assets/ball.svg" alt="ball" title="Большие укражения" />
                  </li>
                  <li class="filter__item middle" data-size="средний">
                    <img src="./assets/ball.svg" alt="ball" title="Украшения среднего размера" />
                  </li>
                  <li class="filter__item small" data-size="малый">
                    <img src="./assets/ball.svg" alt="ball" title="Маленькие украшения" />
                  </li>
                </ul>
              </section>
              <section class="filter">
                <h4 class="filter__title">Любимые: </h4>
                <ul class="filter__list favorite__only">
                  <li class="filter__item">
                    <input type="checkbox" id="favorite-only" name="favorite-only">
                  </li>
                </ul>
              </section>
            </article>
            <article class="block">
              <h3 class="block__title">Сортировка</h3>
              <section class="filter column">
                <select class="sorting" id="sortField">
                  <option value="name">По названию</option>
                  <option value="year">По году</option>
                </select>
                <select class="sorting" id="sortDirection">
                  <option value="asc">По возрастанию</option>
                  <option value="desc">По убыванию</option>
                </select>
              </section>
            </article>
            <article class="block">
              <h3 class="block__title">Фильтры по диапазону</h3>
              <section class="filter column column_160">
                <div class="slider slider-round" id="slider__quantity"></div>
                <div class="filter__wrapper">
                  <input type="text" id="slider__quantity_left" value="1"></input>

                  <input type="text" id="slider__quantity_right" value="12"></input>
                </div>

                <div class="slider slider-round" id="slider__year"></div>
                <div class="filter__wrapper">
                  <input type="text" id="slider__year_left" value="1940"></input>

                  <input type="text" id="slider__year_right" value="2021"></input>
                </div>

              </section>
            </article>
            <article class="block">
              <h3 class="block__title">Сброс всех фильтров</h3>
              <section class="filter">
                <div class="reset">Сбросить</div>
              </section>
            </article>
          </aside>
          <main class="cards__wrapper">
            <div class="cards"></div>
          </main>
        </div>
      </div>
  `,
});
