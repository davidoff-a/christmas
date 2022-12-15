import { DataToy } from '../pages/appToysPage';

interface IToyInfoCard extends DataToy {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: string;

  createCard(): HTMLElement;

  render(elem: HTMLElement, selector: string): void;
}

export class Card implements IToyInfoCard {
  num: string;

  name: string;

  count: string;

  year: string;

  shape: string;

  color: string;

  size: string;

  favorite: string;

  constructor(cardInfo: {
    num: string;
    name: string;
    count: string;
    year: string;
    shape: string;
    color: string;
    size: string;
    favorite: string;
  }) {
    this.num = cardInfo.num;
    this.name = cardInfo.name;
    this.count = cardInfo.count;
    this.year = cardInfo.year;
    this.shape = cardInfo.shape;
    this.color = cardInfo.color;
    this.size = cardInfo.size;
    this.favorite = cardInfo.favorite;
  }

  createCard(): HTMLElement {
    const card: HTMLElement = document.createElement('div');
    card.classList.add('card-of-toy');

    const title: HTMLElement = document.createElement('h4');
    title.innerText = this.name;
    title.classList.add('card-of-toy__title');

    const favorite: HTMLImageElement = document.createElement('img');
    favorite.src = './assets/star.svg';
    favorite.classList.add('favorite');

    const toyImg: HTMLImageElement = document.createElement('img');
    toyImg.src = `./assets/${this.num}.png`;
    toyImg.alt = `toy #${this.num}`;
    toyImg.classList.add('card-of-toy__img');

    const propsList: HTMLElement = document.createElement('ul');
    propsList.classList.add('card-of-toy__propList');
    const props = [
      [this.count, 'Количество:'],
      [this.year, 'Год покупки:'],
      [this.shape, 'Форма:'],
      [this.color, 'Цвет:'],
      [this.size, 'Размер:'],
      [this.favorite ? 'да' : 'нет', 'Любимая:'],
    ];

    props.forEach((prop) => {
      const $property: HTMLElement = document.createElement('li');
      $property.innerText = `${prop[1]} ${prop[0]}`;

      propsList.insertAdjacentElement('beforeend', $property);
    });
    card.insertAdjacentElement('beforeend', title);
    card.insertAdjacentElement('beforeend', favorite);
    card.insertAdjacentElement('beforeend', toyImg);
    card.insertAdjacentElement('beforeend', propsList);
    return card;
  }

  render(elem: HTMLElement, selector: string): void {
    const $placeToInsert: HTMLElement | null = document.querySelector(selector);
    if ($placeToInsert instanceof HTMLElement) {
      $placeToInsert.insertAdjacentElement('beforeend', elem);
    }
  }
}
