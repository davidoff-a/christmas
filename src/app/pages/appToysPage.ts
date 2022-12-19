import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

import { AppComponent } from '../appComponent';
import data from '../../data';
import { Card } from '../components/cards';

type Direction = 'asc' | 'desc';

export interface DataToy {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: string;
}

class AppToysPage extends AppComponent {
  toysData: DataToy[];

  sortDir: Direction;

  sortField: keyof DataToy;

  constructor(config: { selector: string; template: string }, toysData: DataToy[] = data) {
    super(config);
    this.toysData = toysData;
    this.sortField = 'name';
    this.sortDir = 'asc';
  }

  renderCards(toys: DataToy[] = this.toysData, selector: string = '.cards'): void {
    const $cardsContainer: HTMLElement = document.querySelector(selector) as HTMLElement;
    if ($cardsContainer instanceof HTMLElement) {
      $cardsContainer.innerHTML = '';
      toys.forEach((toy) => {
        const card = new Card(toy);
        card.render(card.createCard(), selector);
      });
    }
  }

  filterCards(filterParameters: { [key: string]: string[] }, toys: DataToy[] = this.toysData): DataToy[] {
    const arrFilters = Object.entries(filterParameters);
    const filteredToys = arrFilters.reduce((accToysByCat, curCats) => {
      const [cat, arrValues] = curCats;
      return arrValues.reduce(
        (accToys, curValue) => [...accToys, ...accToysByCat.filter((item) => item[cat as keyof DataToy] === curValue)],
        [] as DataToy[],
      );
    }, toys as DataToy[]);
    const filteredByField = (field: keyof DataToy = 'name', dir: Direction = 'asc') => {
      const res = dir === 'asc' ? 1 : -1;

      return (a: DataToy, b: DataToy) => (a[field] > b[field] ? res : -res);
    };

    const result = filteredToys.length ? filteredToys : toys;

    return result.sort(filteredByField(this.sortField, this.sortDir));
  }

  render(): void {
    this.el = document.querySelector(this.selector) as HTMLElement;
    if (!this.el) {
      throw new Error(`Component with selector ${this.selector} wasn't found!!!`);
    } else {
      this.el.innerHTML = this.template;
    }
    // const sliderRound = document.getElementById('slider-round') as HTMLElement;
    const sliderYear = document.getElementById('slider__quantity') as HTMLElement;
    const sliderQuantity = document.getElementById('slider__quantity') as HTMLElement;

    // noUiSlider.create(sliderRound, {
    //   start: [1, 12],
    //   connect: true,
    //   step: 1,
    //   range: {
    //     min: 1,
    //     max: 12,
    //   },
    // });

    noUiSlider.create(sliderQuantity, {
      start: [1, 12],
      connect: true,
      step: 1,
      range: {
        min: 1,
        max: 12,
      },
    });

    noUiSlider.create(sliderYear, {
      start: [1940, 2010],
      connect: true,
      step: 5,
      range: {
        min: 1940,
        max: 2010,
      },
    });

    const listOfFilters = document.querySelectorAll('.filter__list');
    const Filters = {} as { [key: string]: string[] };

    const sortField = document.getElementById('sortField') as HTMLInputElement;
    const sortDir = document.getElementById('sortDirection') as HTMLInputElement;

    sortField.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      if (target) {
        this.sortField = target.value as keyof DataToy;
      }
      this.renderCards(this.filterCards(Filters, this.toysData));
    });

    sortDir.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      if (target) {
        this.sortDir = target.value as Direction;
      }
      this.renderCards(this.filterCards(Filters, this.toysData));
    });

    this.renderCards(this.filterCards(Filters, this.toysData));

    Array.from(listOfFilters).map((item) => item.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const tClosestFItem = target.closest('.filter__item') as HTMLElement;
      if (tClosestFItem) {
        const [attributeKey, arrParam] = Object.entries(tClosestFItem.dataset)[0];
        if (tClosestFItem.classList.contains('active')) {
          tClosestFItem.classList.remove('active');
          Filters[attributeKey] = Filters[attributeKey].filter((attr) => attr !== arrParam);
          if (Filters[attributeKey].length === 0) {
            delete Filters[attributeKey];
          }
          this.renderCards(this.filterCards(Filters, this.toysData));
        } else {
          tClosestFItem.classList.add('active');
          Array.isArray(Filters[attributeKey])
            ? Filters[attributeKey].push(arrParam as string)
            : (Filters[attributeKey] = [arrParam as string]);
          this.renderCards(this.filterCards(Filters, this.toysData));
        }
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
                <ul class="filter__list row shapes">
                  <li class="filter__item" data-shape="шар">
                    <img src="./assets/ball.svg" alt="ball" title="Украшения в форме шара" />
                  </li>
                  <li class="filter__item" data-shape="колокольчик">
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
                <ul class="filter__list row colors">
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
                <ul class="filter__list row sizes">
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
                <ul class="filter__list row favorite__only">
                  <li class="filter__item" data-favorite="1">
                    <input type="checkbox" id="favorite-only" name="favorite-only">
                  </li>
                </ul>
              </section>
            </article>
            <article class="block">
              <h3 class="block__title">Сортировка</h3>
              <section class="filter col">
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
            <article class="block block__high">
              <h3 class="block__title">Фильтры по диапазону</h3>
              <section class="filter col">
<!--                <div class="slider slider-round" id="slider__quantity">Количество</div>-->
                <ul class="filter__list row col">
                  <li class="filter__item range">
                    <h4 class="filter__title">Количество</h4>
                    <div class="slider slider-styled slider-round" id="slider__quantity"></div>
                    <div class="slider__controls row">
                      <input type="text" class="slider__input" id="quantity_min" value="1">
                      <input type="text" class="slider__input" id="quantity_max" value="12">
                    </div>
                </li>
<!--                <li class="filter__item">-->
<!--                  <h4 class="filter__title">По году</h4>-->
<!--                  <div class="slider slider-styled slider-round" id="slider__year"></div>-->
<!--                  <div class="row">-->
<!--                    <input type="text" class="slider__input" id="year_min" value="1940">-->
<!--                    <input type="text" class="slider__input" id="year_max" value="2010">-->
<!--                  </div>-->
<!--                  -->
<!--                  </li>-->
                </ul>
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
