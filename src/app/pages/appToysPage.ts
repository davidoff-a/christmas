import * as noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import 'nouislider/dist/nouislider.css';

import { AppComponent } from '../appComponent';
import data from '../../data';
import Card from '../components/cards';
import { Direction, getToys } from '../components/filters';

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

  filters: { [key: string]: string[] };

  rangeFilters: { [key: string]: string[] };

  constructor(config: { selector: string; template: string }, toysData: DataToy[] = data) {
    super(config);
    this.toysData = toysData;
    this.sortField = 'name';
    this.sortDir = 'asc';
    this.filters = {};
    this.rangeFilters = {
      count: ['1', '1'],
      year: ['1', '1'],
    };
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

  // filterCards(
  //   fParams: { [key: string]: string[] },
  //   rParams: { [key: string]: string[] },
  //   toys: DataToy[] = this.toysData,
  // ): DataToy[] {
  //   const arrFilters = Object.entries(fParams);
  //   const filteredToys = arrFilters.reduce((accToysByCat, curCats) => {
  //     const [cat, arrValues] = curCats;
  //     return arrValues.reduce(
  //       (accToys, curValue) => [...accToys, ...accToysByCat.filter((item) => item[cat as keyof DataToy] === curValue)],
  //       [] as DataToy[],
  //     );
  //   }, toys as DataToy[]);
  //
  //   const rFilters = Object.entries(rParams);
  //   const filtered = rFilters.reduce((accToysByCat, curCats) => {
  //     const [cat, arrValues] = curCats;
  //     return arrValues.reduce(
  //       (accToys, curValue, idx) => [
  //         ...accToys,
  //         ...accToysByCat.filter((item) => (idx === 0 ? item[cat as keyof DataToy] >= curValue : item[cat as keyof DataToy] >= curValue)),
  //       ],
  //       [] as DataToy[],
  //     );
  //   }, filteredToys as DataToy[]);
  //
  //   const filteredByField = (field: keyof DataToy = 'name', dir: Direction = 'asc') => {
  //     const res = dir === 'asc' ? 1 : -1;
  //     return (a: DataToy, b: DataToy) => (a[field] > b[field] ? res : -res);
  //   };
  //
  //   // const result = filtered.length ? filtered : toys;
  //
  //   return filtered.sort(filteredByField(this.sortField, this.sortDir));
  // }

  render(): void {
    this.el = document.querySelector(this.selector) as HTMLElement;
    if (!this.el) {
      throw new Error(`Component with selector ${this.selector} wasn't found!!!`);
    } else {
      this.el.innerHTML = this.template;
    }
    // const sliderRound = document.getElementById('slider-round') as HTMLElement;
    const sliderYear = document.getElementById('slider__year') as noUiSlider.target;
    const sliderQuantity = document.getElementById('slider__quantity') as noUiSlider.target;
    const inputQtyMin = document.getElementById('quantity_min') as HTMLInputElement;
    const inputQtyMax = document.getElementById('quantity_max') as HTMLInputElement;
    const inputYearMin = document.getElementById('year_min') as HTMLInputElement;
    const inputYearMax = document.getElementById('year_max') as HTMLInputElement;

    const qtyInputs = [inputQtyMin, inputQtyMax];
    const yearInputs = [inputYearMin, inputYearMax];

    const sorting = (f: keyof DataToy): DataToy[] => data.sort((a, b) => (+a[f] < +b[f] ? 1 : -1));
    const getMax = (field: keyof DataToy) => sorting(field)[0][field];
    const getMin = (field: keyof DataToy) => sorting(field).reverse()[0][field];

    const resetBtn = document.querySelector('.reset') as HTMLElement;
    const resetFilters = () => {
      this.rangeFilters.count[0] = `${getMin('count')}`;
      this.rangeFilters.count[1] = `${getMax('count')}`;
      this.rangeFilters.year[0] = `${getMin('year')}`;
      this.rangeFilters.year[1] = `${getMax('year')}`;
    };
    resetBtn.addEventListener('click', () => {
      const fItems = document.querySelectorAll('.filter__item');
      const favorite = document.getElementById('favorite-only') as HTMLInputElement;

      resetFilters();
      this.filters = {};
      this.sortField = 'name';
      sortField.value = 'name';
      this.sortDir = 'asc';
      sortDir.value = 'asc';
      sliderQuantity.noUiSlider!.set([getMin('count'), getMax('count')]);
      sliderYear.noUiSlider!.set([getMin('year'), getMax('year')]);

      Array.from(fItems).map((item) => item.classList.remove('active'));
      favorite.checked = false;
      this.renderCards(getToys.execute(getToys.fConfig, getToys.toysData));
    });

    resetFilters();

    noUiSlider.create(sliderQuantity, {
      start: [getMin('count'), getMax('count')],
      connect: true,
      step: 1,
      range: {
        min: +getMin('count'),
        max: +getMax('count'),
      },
      format: wNumb({
        decimals: 0,
      }),
    });

    if (sliderQuantity.noUiSlider) {
      sliderQuantity.noUiSlider.on('update', (values, handle) => {
        qtyInputs[handle].value = `${values[handle]}`;
        this.rangeFilters.count[handle] = `${values[handle]}`;
        this.renderCards(getToys.execute(getToys.fConfig, getToys.toysData));
      });
    }
    noUiSlider.create(sliderYear, {
      start: [getMin('year'), getMax('year')],
      connect: true,
      step: 5,
      range: {
        min: +getMin('year'),
        max: +getMax('year'),
      },
      format: wNumb({
        decimals: 0,
      }),
    });

    if (sliderYear.noUiSlider) {
      sliderYear.noUiSlider.on('update', (values, handle) => {
        yearInputs[handle].value = `${values[handle]}`;
        this.rangeFilters.year[handle] = `${values[handle]}`;
        this.renderCards(getToys.execute(getToys.fConfig, getToys.toysData));
      });
    }

    inputQtyMin.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      if (target) {
        const rangeLimit = sliderQuantity.noUiSlider!.get() as string[];
        rangeLimit[0] = target.value;
        sliderQuantity.noUiSlider!.set(rangeLimit);
      }
    });

    inputQtyMax.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      if (target) {
        const rangeLimit = sliderQuantity.noUiSlider!.get() as string[];
        rangeLimit[1] = target.value;
        sliderQuantity.noUiSlider!.set(rangeLimit);
      }
    });

    inputYearMin.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      if (target) {
        const rangeLimit = sliderYear.noUiSlider!.get() as string[];
        rangeLimit[0] = target.value;
        sliderYear.noUiSlider!.set(rangeLimit);
      }
    });

    inputYearMax.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      if (target) {
        const rangeLimit = sliderYear.noUiSlider!.get() as string[];
        rangeLimit[1] = target.value;
        sliderYear.noUiSlider!.set(rangeLimit);
      }
    });

    // TODO: optimize eventHandlers

    const listOfFilters = document.querySelectorAll('.filter__list');
    // const Filters = {} as { [key: string]: string[] };

    const sortField = document.getElementById('sortField') as HTMLInputElement;
    const sortDir = document.getElementById('sortDirection') as HTMLInputElement;
    // TODO: improve this code with universal handler with generic type
    sortField.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      if (target) {
        this.sortField = target.value as keyof DataToy;
      }
      this.renderCards(getToys.execute(getToys.fConfig, getToys.toysData));
    });

    sortDir.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      if (target) {
        this.sortDir = target.value as Direction;
      }
      this.renderCards(getToys.execute(getToys.fConfig, getToys.toysData));
    });

    this.renderCards(getToys.execute(getToys.fConfig, getToys.toysData));
    console.log('list of filters =>', listOfFilters);
    Array.from(listOfFilters).map((item) => item.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const tClosestFItem = target.closest('.filter__item') as HTMLElement;
      if (!Object.keys(tClosestFItem).length) {
        console.log('closest item =>', tClosestFItem.dataset);
        // TODO: add checking for empty object dataset
        const [attributeKey, arrParam] = Object.entries(tClosestFItem.dataset)[0];
        if (tClosestFItem.classList.contains('active')) {
          tClosestFItem.classList.remove('active');
          getToys.fConfig[attributeKey] = getToys.fConfig[attributeKey].filter(
            (attr: string | undefined) => attr !== arrParam,
          );
          if (getToys.fConfig[attributeKey].length === 0) {
            delete getToys.fConfig[attributeKey];
          }
          this.renderCards(getToys.execute(getToys.fConfig, getToys.toysData));
        } else {
          tClosestFItem.classList.add('active');
          Array.isArray(getToys.fConfig[attributeKey])
            ? getToys.fConfig[attributeKey].push(arrParam as string)
            : (getToys.fConfig[attributeKey] = [arrParam as string]);
          this.renderCards(getToys.execute(getToys.fConfig, getToys.toysData));
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
              <section class="filter row">
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
              <section class="filter row">
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
              <section class="filter row">
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
              <section class="filter row">
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
              <section class="filter row">
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
                    <div class="row slider__controls">
                      <input type="text" class="slider__input" id="quantity_min" value="1">
                      <input type="text" class="slider__input" id="quantity_max" value="12">
                    </div>
                </li>
                </ul>
                
              </section>
              <section class="filter col">
              <ul class="filter__list row col">
                <li class="filter__item range">
                  <h4 class="filter__title">По году</h4>
                  <div class="slider slider-styled slider-round" id="slider__year"></div>
                  <div class="row slider__controls">
                    <input type="text" class="slider__input" id="year_min" value="1940">
                    <input type="text" class="slider__input" id="year_max" value="2010">
                  </div>
                  
                  </li>
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
