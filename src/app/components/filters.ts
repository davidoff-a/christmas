// TODO: filter by range
// TODO: filter by sorting
// TODO: filter by reset filters

import { DataToy } from './cards';

import data from '../../data';
// import { appToysPage } from '../pages/appToysPage';

export type Direction = 'asc' | 'desc';

type Obj = { [key: string]: string[] };
class Filtron {
  toysData: DataToy[];

  sortDir: Direction;

  sortField: keyof DataToy;

  fConfig: Obj = {};

  constructor(toysData: DataToy[] = data) {
    this.toysData = toysData;
    this.sortField = 'name';
    this.sortDir = 'asc';
    this.fConfig = {
      count: ['1', '12'],
      year: ['1940', '2020'],
      // TODO: improve filters to work with range filters
    };
  }

  execute(fParams: Obj, toys: DataToy[] = this.toysData): DataToy[] {
    const arrFilters = Object.entries(fParams);
    const filteredToys = arrFilters.reduce((accToysByCat, curCats) => {
      const [cat, arrValues] = curCats;
      return arrValues.reduce(
        (accToys, curVal) => {
          const cValFiltered = accToysByCat.filter((item) => item[cat as keyof DataToy] === curVal);
          return [...accToys, ...cValFiltered];
        },
        [] as DataToy[],
      );
    }, toys as DataToy[]);

    const filteredByField = (field: keyof DataToy = 'name', dir: Direction = 'asc') => {
      const res = dir === 'asc' ? 1 : -1;
      return (a: DataToy, b: DataToy) => (a[field] > b[field] ? res : -res);
    };

    // const result = filtered.length ? filtered : toys;

    return filteredToys.sort(filteredByField(this.sortField, this.sortDir));
  }
}

export const getToys = new Filtron(data);
