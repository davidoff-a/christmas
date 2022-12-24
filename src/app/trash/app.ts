import * as noUiSlider from 'nouislider';

import 'nouislider/dist/nouislider.css';

import data from '../../data';
import { DataToy } from '../pages/appToysPage';
import { Card } from '../components/cards';
import { dynamicSort, filterToys, filterToysByNumValues } from './search';
import { handleFavorite } from './favorites';
import { cleanTag } from '../utils/utils';

interface IChunks {
  [keys: string]: string;
}

interface IAttributes {
  [keys: string]: string;
}

type filterTypes = keyof DataToy;

export class App {
  htmlChunks: IChunks = {
    page: '<div class="wrapper wrapper_column"></div>',
    header: `
  <header class="header">
        <div class="container">
          <div class="wrapper">
            <nav class="nav__menu">
              <ul class="nav__list">
                <li class="nav__item">
                  <a href="./index.html" class="nav__link">
                    <img
                      class="nav__img"
                      src="./assets/svg/tree.svg"
                      alt="Начало игры"
                    />
                  </a>
                </li>
                <li class="nav__item">
                  <a href="./toys.html" class="nav__link">Игрушки</a>
                </li>
                <li class="nav__item">
                  <a href="./trees.html" class="nav__link">Наряди ёлку</a>
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
      </header>
    `,
    home: `
  <div class="content">
        <div class="container">
          <div class="wrapper">
            <img
              src="./assets/ball/1.png"
              alt="Ёлочная игрушка - шар"
              class="ball ball1"
            />
            <img
              src="./assets/ball/2.png"
              alt="Ёлочная игрушка - шар"
              class="ball ball2"
            />
            <div class="app">
              <div class="app__invitation">
              Помоги бабушке<br />
              нарядить ёлку
            </div>
            <div class="app__start-btn">
              <a href="toys.html">Начать</a>
            </div>
            </div>
          </div>
        </div>
      </div>
  `,
    content: `
    <div class="content">
      <div class="container">
        <div class="wrapper">
          <aside class="controls">
            <article class="block">
              <h3 class="block__title">Фильтры</h3>
              <section class="filter">
                <h4 class="filter__title">Форма: </h4>
                <ul class="filter__list shapes">
                  <li class="filter__item" data-shape="шар">
                    <img src="./assets/svg/ball.svg" alt="ball" title="Украшения в форме шара" />
                  </li>
                  <li class="filter__item" data-shape="колокол">
                    <img src="./assets/svg/bell.svg" alt="bell" title="Украшения в форме колокольчика" />
                  </li>
                  <li class="filter__item" data-shape="шишка">
                    <img src="./assets/svg/cone.svg" alt="cone" title="Украшения в форме шишки" />
                  </li>
                  <li class="filter__item" data-shape="снежинка">
                    <img src="./assets/svg/snowflake.svg" alt="snow" title="Украшения в форме снежинки" />
                  </li>
                  <li class="filter__item" data-shape="фигурка">
                    <img src="./assets/svg/toy.svg" alt="toy" title="Украшения в форме игрушки" />
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
                    <img src="./assets/svg/ball.svg" alt="ball" title="Большие укражения" />
                  </li>
                  <li class="filter__item middle" data-size="средний">
                    <img src="./assets/svg/ball.svg" alt="ball" title="Украшения среднего размера" />
                  </li>
                  <li class="filter__item small" data-size="малый">
                    <img src="./assets/svg/ball.svg" alt="ball" title="Маленькие украшения" />
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
          <main class="cards">
          </main>
        </div>
      </div>
    </div>`,
    tree: `
    <div class="container">
          <div class="wrapper">
            <aside class="side side_left">
              <section class="block">
                <div class="wrapper wrapper_start">
                  <img
                    src="./assets/svg/audio.svg"
                    alt="audio-control"
                    class="control"
                  />
                  <img
                    src="./assets/svg/snowflake.svg"
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
    footer: `
  <footer class= "footer">
    <div class="container">
      <div class="footer__wrapper">
        <a href="https://github.com/davidoff-a/" class="footer__link"><div class="author">Davidoff-A</div></a>
        <div class="rs-logo">
        <a href="https://rs.school/" class="footer__link"><img src="./assets/rss.svg" alt="rsschool logo"
            class="rss-logo" /></a>
        </div>
        </div>
      
    </div>
  </footer>
    `,
  };

  filterInfo = {
    appliedFilters: [],
    filteredItems: {},
  };

  init(): void {
    const $body = document.querySelector('body');
    if ($body instanceof HTMLElement) {
      $body.insertAdjacentHTML('beforeend', this.htmlChunks.page);
      const $toysPage = document.querySelector('.wrapper.wrapper_column');
      if ($toysPage instanceof HTMLElement) {
        $toysPage.insertAdjacentHTML('beforeend', this.htmlChunks.header);
        $toysPage.insertAdjacentHTML('beforeend', this.htmlChunks.home);
        $toysPage.insertAdjacentHTML('beforeend', this.htmlChunks.footer);
      }
    }
    const $searchInput = document.querySelector('#searchField') as HTMLElement;
    $searchInput.focus();

    const $sliderQuantity = document.querySelector('#slider__quantity') as noUiSlider.target;
    const $sliderYear = document.querySelector('#slider__year') as noUiSlider.target;
    if ($sliderYear instanceof HTMLElement && $sliderQuantity instanceof HTMLElement) {
      noUiSlider.create($sliderYear, {
        start: [1940, 2020],
        connect: true,
        range: {
          min: 1940,
          '12%': 1950,
          '24%': 1960,
          '36%': 1970,
          '48%': 1980,
          '60%': 1990,
          '72%': 2000,
          '84%': 2010,
          max: 2020,
        },
        snap: true,
      });

      noUiSlider.create($sliderQuantity, {
        connect: true,
        range: {
          min: 1,
          '9%': 2,
          '18%': 3,
          '27%': 4,
          '36%': 5,
          '45%': 6,
          '54%': 7,
          '63%': 8,
          '72%': 9,
          '81%': 10,
          '90%': 11,
          max: 12,
        },
        snap: true,
        start: [1, 12],
      });
      const $inputQuantityLeft: HTMLInputElement = document.querySelector('#slider__quantity_left') as HTMLInputElement;
      const $inputQuantityRight: HTMLInputElement = document.querySelector(
        '#slider__quantity_right',
      ) as HTMLInputElement;
      const $inputYearLeft: HTMLInputElement = document.querySelector('#slider__year_left') as HTMLInputElement;
      const $inputYearRight: HTMLInputElement = document.querySelector('#slider__year_right') as HTMLInputElement;
      const filterQuantityInputs: HTMLInputElement[] = [$inputQuantityLeft, $inputQuantityRight];
      const filterYearInputs: HTMLInputElement[] = [$inputYearLeft, $inputYearRight];
      if ($sliderQuantity.noUiSlider !== undefined) {
        $sliderQuantity.noUiSlider.on('slide', (values, handle) => {
          filterQuantityInputs[handle].value = `${values[handle]}`;
          this.renderCards(filterToysByNumValues(data, 'count', [Number(handle), Number(values[handle])]));
        });
      }
      if ($sliderYear.noUiSlider !== undefined) {
        $sliderYear.noUiSlider.on('slide', (values, handle) => {
          filterYearInputs[handle].value = `${values[handle]}`;
          this.renderCards(filterToysByNumValues(data, 'year', [Number(handle), Number(values[handle])]));
        });
      }
    }

    this.renderCards(data);
    handleFavorite();
    this.initListeners();
  }

  changePage(chunkName: string): void {
    const $content: HTMLElement = document.querySelector('.content') as HTMLElement;
    if ($content instanceof HTMLElement) {
      $content.innerHTML = this.htmlChunks[chunkName];
    }
  }

  initListeners(): void {
    const $searchInput = document.querySelector('#searchField') as HTMLInputElement;
    if ($searchInput instanceof HTMLInputElement) {
      $searchInput.addEventListener('input', () => {
        this.renderCards(filterToys(data, 'name', $searchInput.value));
      });
    }
    const typesOfFilter: filterTypes[] = ['shape', 'color', 'size'];
    typesOfFilter.forEach((str) => this.addFilter(str as keyof DataToy));

    const $sortDir = document.querySelector('#sortDirection') as HTMLSelectElement;
    const $sortField = document.querySelector('#sortField') as HTMLSelectElement;
    [$sortDir, $sortField].forEach((select) => {
      select.addEventListener('change', () => {
        const sortingDir: string = $sortDir.options[$sortDir.selectedIndex].value;
        const sortingField = $sortField.options[$sortField.selectedIndex].value as keyof DataToy;
        this.renderCards(data.sort(dynamicSort(sortingField, sortingDir)));
      });
    });
    const $filterFavorites: HTMLInputElement | null = document.querySelector('#favorite-only');
    if ($filterFavorites instanceof HTMLInputElement) {
      $filterFavorites.addEventListener('click', () => {
        if ($filterFavorites.checked) {
          this.renderCards(filterToys(data, 'favorite', 'true'));
        } else {
          this.renderCards(data);
        }
      });
    }
    const $resetBtn = document.querySelector('.reset');
    if ($resetBtn instanceof HTMLElement) {
      $resetBtn.addEventListener('click', (event) => {
        const { target } = event;
        if (target instanceof HTMLElement && target.classList.contains('reset')) {
          localStorage.removeItem('filteredArr');
        }
      });
    }
  }

  addFilter(type: keyof DataToy): void {
    const $filter = document.querySelector(`.${type}s`);
    if ($filter instanceof HTMLElement) {
      $filter.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (target instanceof HTMLElement && target.closest('li') instanceof HTMLElement) {
          const $closestLi = target.closest('li');
          if ($closestLi) {
            $closestLi.classList.toggle('active');
          }
          const filterAttr = $closestLi?.getAttribute(`data-${type}`) as string;
          this.renderCards(filterToys(data, type, filterAttr));
        }
      });
    }
  }

  renderCards(bigData: DataToy[]): void {
    const $main = document.querySelector('.cards') as HTMLElement;
    cleanTag('.cards');
    bigData.forEach((item) => {
      if ($main instanceof HTMLElement) {
        const toyInfo = new Card(item);
        toyInfo.render(toyInfo.createCard(), '.cards');
      }
    });
  }

  createElement(selector: string, classes: string[], attributes?: IAttributes): HTMLElement {
    const $element = document.createElement(selector);
    if (classes !== undefined) {
      classes.forEach((className) => $element.classList.add(className));
    }
    if (attributes !== undefined) {
      Object.entries(attributes).forEach((attr) => $element.setAttribute(attr[0], attr[1]));
    }
    return $element;
  }
}
