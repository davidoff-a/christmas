import { AppComponent } from "../appComponent";

function cleanTag(selector: string) {
  const $place = document.querySelector(selector);
  if ($place instanceof HTMLElement) {
    $place.innerHTML = "";
  }
}

const wfm = {
  delay(ms = 1000) {
    return new Promise((resolve):void => { 
      setTimeout((): void => {
        resolve(null);
      }, ms);
    })
  },
  isUndefined(d: { path: string, component: AppComponent } | {[keys:string]:string}|undefined) {
    return typeof d === 'undefined';
  }
}

export { cleanTag, wfm };
