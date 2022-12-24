import { Component } from '../core/component';

class AppFooter extends Component {
  constructor(config: { selector: string; template: string }) {
    super(config);
  }
}

export const appFooter = new AppFooter({
  selector: '.footer',
  template: `
    <div class="card-of-toy">
      <h4 class="card-of-toy__title">Большой шар с рисунком</h4>
      <img src="./assets/star.svg" class="favorite">
      <img src="./assets/1.png" alt="toy #1" class="card-of-toy__img">
        <ul class="card-of-toy__propList">
          <li>Количество: 2</li>
          <li>Год покупки: 1960</li>
          <li>Форма: шар</li>
          <li>Цвет: желтый</li>
          <li>Размер: большой</li>
          <li>Любимая: нет</li>
        </ul>
    </div>
    `,
});
