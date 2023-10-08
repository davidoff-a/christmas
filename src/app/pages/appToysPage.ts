import * as noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import 'nouislider/dist/nouislider.css';

import { AppComponent } from '../appComponent';
import data from '../../data';
import Card from '../components/cards';
import { Direction, getToys } from '../components/filters';
import { Component } from '../core/component';
import { changeElementActivity, isElementActive } from '../utils/utils';

// TODO: generate HTML with TS
// TODO: generate page structure
// TODO: embed into render method rendering cards and filters
// TODO: create class for creating filters, cards
// TODO: implement decorator development template
// TODO: make separate class for data-filtering
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

  // filters: { [key: string]: string[] };

  // rangeFilters: { [key: string]: string[] };

  constructor(config: { selector: string; template: string }, toysData: DataToy[] = data) {
    super(config);
    this.toysData = toysData;
    this.sortField = 'name';
    this.sortDir = 'asc';
    
    // this.filters = {};
    // this.rangeFilters = {
    //   count: [this.getMin('count'), this.getMax('count')],
    //   year: [this.getMin('year'), this.getMax('count')],
    // };
  }

  renderCards(toys: DataToy[] = this.toysData, selector: string = '.cards'): void {
    const $cardsContainer: HTMLElement = document.querySelector(selector) as HTMLElement;
    if ($cardsContainer instanceof HTMLElement) {
      $cardsContainer.innerHTML = '';
      toys.forEach((toy) => {
        const card = new Card(toy);
        card.render(selector, card.createCard());
      });
    }
  }

  // resetFilters = () => {
  //   this.rangeFilters.count[0] = `${this.getMin('count')}`;
  //   this.rangeFilters.count[1] = `${this.getMax('count')}`;
  //   this.rangeFilters.year[0] = `${this.getMin('year')}`;
  //   this.rangeFilters.year[1] = `${this.getMax('year')}`;
  // };

  // sorting = (f: keyof DataToy): DataToy[] => data.sort((a, b) => (+a[f] < +b[f] ? 1 : -1));
  //
  // getMax = (field: keyof DataToy) => this.sorting(field)[0][field];
  //
  // getMin = (field: keyof DataToy) => this.sorting(field).reverse()[0][field];

  render(): void {
    this.el = document.querySelector(this.selector) as HTMLElement;
    if (!this.el) {
      throw new Error(`Component with selector ${this.selector} wasn't found!!!`);
    } else {
      this.el.innerHTML = this.template;
      filterShape.render();
      filterSize.render();
      filterColor.render();
      likeFilter.render();
      sortingFilters.render();
      rangeFilters.render();
      this.addEvListeners();
    }
  }

  addEvListeners() {
    const listOfFilters = document.querySelectorAll('.filter__list');
    this.sliderAction('slider__quantity', 'quantity_min', 'quantity_max', { min: 1, max: 12, step: 1 });
    this.sliderAction('slider__year', 'year_min', 'year_max', { min: 1940, max: 2025, step: 5 });
    this.sortHandle();
    this.cardsHandle(listOfFilters);
    this.renderCards(getToys.execute(getToys.fConfig, getToys.toysData));
  }

  sliderAction(
    sliderId: string,
    inputIdMin: string,
    inputIdMax: string,
    rangeFilterConfig: { min: number; max: number; step: number }
  ) {
    const slider = document.getElementById(sliderId) as noUiSlider.target;
    const sliderMin = document.getElementById(inputIdMin) as HTMLInputElement;
    const sliderMax = document.getElementById(inputIdMax) as HTMLInputElement;
    const inputs = [sliderMin, sliderMax];

    noUiSlider.create(slider, {
      start: [rangeFilterConfig.min, rangeFilterConfig.max],
      connect: true,
      step: rangeFilterConfig.step,
      range: {
        min: rangeFilterConfig.min,
        max: rangeFilterConfig.max,
      },
      format: wNumb({
        decimals: 0,
      }),
    });

    if (slider.noUiSlider) {
      slider.noUiSlider.on('update', (values, handle) => {
        inputs[handle].value = `${values[handle]}`;
        // this.rangeFilters.count[handle] = `${values[handle]}`;
        // getToys.
        this.renderCards(getToys.execute(getToys.fConfig, getToys.toysData));
      });
    }

    sliderMin.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      if (target) {
        const rangeLimit = slider.noUiSlider!.get() as string[];
        rangeLimit[0] = target.value;
        slider.noUiSlider!.set(rangeLimit);
      }
    });

    sliderMax.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      if (target) {
        const rangeLimit = slider.noUiSlider!.get() as string[];
        rangeLimit[1] = target.value;
        slider.noUiSlider!.set(rangeLimit);
      }
    });
  }

  sortHandle() {
    // const resetBtn = document.querySelector('.reset') as HTMLElement;

    // resetBtn.addEventListener('click', () => {
    //   const fItems = document.querySelectorAll('.filter__item');
    //   const favorite = document.getElementById('favorite-only') as HTMLInputElement;
    //
    //   // this.resetFilters();
    //   // this.filters = {};
    //   this.sortField = 'name';
    //   sortField.value = 'name';
    //   this.sortDir = 'asc';
    //   sortDir.value = 'asc';
    //   sliderQuantity.noUiSlider!.set([this.getMin('count'), this.getMax('count')]);
    //   sliderYear.noUiSlider!.set([this.getMin('year'), this.getMax('year')]);
    //
    //   Array.from(fItems).map((item) => item.classList.remove('active'));
    //   favorite.checked = false;
    //   this.renderCards(getToys.execute(getToys.fConfig, getToys.toysData));
    // });

    // this.resetFilters();

    // TODO: optimize eventHandlers

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
  }

  cardsHandle(listOfFilters: NodeList) {
    //TODO this method implements some different actions, I need to split this method to several methods
    Array.from(listOfFilters).map((item) =>
      item.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const tClosestFItem = target.closest('.filter__item') as HTMLElement;
        const fConf = localStorage.getItem('filterConfig');
        const fConfObj = JSON.parse(fConf as string);

        if (!Object.keys(tClosestFItem).length) {
          const [attributeKey, arrParam] = Object.entries(tClosestFItem.dataset)[0];
          if (isElementActive(tClosestFItem, 'active')) {
            changeElementActivity(tClosestFItem, 'active');
            fConfObj[attributeKey].data = fConfObj[attributeKey].data.filter((attr: string | undefined) => attr !== arrParam);
            console.log(getToys.filterConf);
            
            // localStorage.removeItem('filterConfig');
            localStorage.setItem('filterConfig', JSON.stringify(fConfObj));
            getToys.fConfig[attributeKey] = getToys.fConfig[attributeKey].filter(
              (attr: string | undefined) => attr !== arrParam
            );
            if (getToys.fConfig[attributeKey].length === 0) {
              delete getToys.fConfig[attributeKey];
            }
            this.renderCards(getToys.execute(getToys.fConfig, getToys.toysData));
          } else {
            changeElementActivity(tClosestFItem, 'active');

            fConfObj[attributeKey].data.push(arrParam);
            localStorage.setItem('filterConfig', JSON.stringify(fConfObj));
            Array.isArray(getToys.fConfig[attributeKey])
              ? getToys.fConfig[attributeKey].push(arrParam as string)
              : (getToys.fConfig[attributeKey] = [arrParam as string]);
            this.renderCards(getToys.execute(getToys.fConfig, getToys.toysData));
          }
        }
      })
    );
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
              <div id="shapeFilters"></div>
              <div id="colorFilters"></div>
              <div id="sizeFilter"></div>
              <div id="likeFilter"></div>
            </article>
            <article class="block">
              <h3 class="block__title">Сортировка</h3>
              <div id="sortFilter"></div>
            </article>
            <article class="block block__high">
              <h3 class="block__title">Фильтры по диапазону</h3>
              <div id="yearFilter"></div>
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

const filterShape = new Component({
  selector: '#shapeFilters',
  template: `
  <section class="filter row">
    <h4 class="filter__title" id="fShape">Форма: </h4>
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
  `,
});

const filterColor = new Component({
  selector: '#colorFilters',
  template: `
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
  </section>`,
});

const filterSize = new Component({
  selector: '#sizeFilter',
  template: `
  <section class="filter row">
    <h4 class="filter__title">Размер: </h4>
    <div id="size-filters"></div>
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
  </section>`,
});

const likeFilter = new Component({
  selector: '#likeFilter',
  template: `
  <section class="filter row">
    <h4 class="filter__title">Любимые: </h4>
    <ul class="filter__list row favorite__only">
      <li class="filter__item" data-favorite="1">
        <input type="checkbox" id="favorite-only" name="favorite-only">
      </li>
    </ul>
  </section>
  `,
});

const sortingFilters = new Component({
  selector: '#sortFilter',
  template: `
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
  `,
});

const rangeFilters = new Component({
  selector: '#yearFilter',
  template: `
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
  `,
});

