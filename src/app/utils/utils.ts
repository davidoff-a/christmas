import { AppComponent } from '../appComponent';
import { DataToy } from '../components/cards';
import data from '../../data';

function cleanTag(selector: string) {
  const $place = document.querySelector(selector);
  if ($place instanceof HTMLElement) {
    $place.innerHTML = '';
  }
}

const wfm = {
  delay(ms = 1000) {
    return new Promise((resolve): void => {
      setTimeout((): void => {
        resolve(null);
      }, ms);
    });
  },
  isUndefined(d: { path: string; component: AppComponent } | { [keys: string]: string } | undefined) {
    return typeof d === 'undefined';
  },
};

function itemsFilter(field: keyof DataToy, parameter: string, dataArray: DataToy[] = data) {
  return dataArray.filter((item) => item[field] === parameter);
}

function isElementActive(item: HTMLElement, cl: string): boolean {
  return item.classList.contains(cl);
}

function changeElementActivity(item: HTMLElement, cl: string): void {
  isElementActive(item, cl) ? item.classList.remove(cl) : item.classList.add(cl);
}

function resetElementsActivity(cl: string) {
  const activeElements = document.querySelectorAll(cl);
  for (const el of activeElements) {
    el.classList.remove(cl);
  }
}

export { cleanTag, wfm, itemsFilter, isElementActive, changeElementActivity, resetElementsActivity };
