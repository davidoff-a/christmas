// TODO: filter by range
// TODO: filter by sorting
// TODO: filter by reset filters

import { DataToy } from './cards';

import data from '../../data';
import { Component } from '../core/component';
// import { appToysPage } from '../pages/appToysPage';

type Direction = 'asc' | 'desc';

type Obj = { [key: string]: string[] };

export interface filterConfig  {
  [key: string]:{[key:string]:string|string[]}
}

const filterConfigDefault = {
  shape: {
    type: 'multi',
    data: ['шар', 'колокольчик', 'шишка', 'снежинка', 'фигурка'],
  },
  size: {
    type: 'multi',
    data: ['большой', 'средний', 'малый'],
  },
  color: {
    type: 'multi',
    data: ['белый', 'желтый', 'красный', 'синий', 'зеленый'],
  },
  sorting: {
    type: 'sort',
    data: ['name', 'asc'],
  },
  like: {
    type: 'multi',
    data: ['false'],
  },
  year: {
    type: 'range',
    data: [1940, 2025],
    step: 5
  },
  quantity: {
    type: 'range',
    data: [1, 12],
    step: 1
  },
};

class Filtron {
  toysData: DataToy[];

  sortDir: Direction;

  sortField: keyof DataToy;

  fConfig: Obj = {};

  filterConf: typeof filterConfigDefault;

  constructor(toysData: DataToy[] = data) {
    this.toysData = toysData;
    this.sortField = 'name';
    this.sortDir = 'asc';
    this.fConfig = {
      count: ['1', '12'],
      year: ['1940', '2020'],
      //TODO: add filter's name and value to Set (unique collection). Filter's name, filter's type, filter's value or array of values
      //TODO: improve filters to work with range filters
    };
    this.filterConf = filterConfigDefault;
  }

  execute(fParams: Obj, toys: DataToy[] = this.toysData, filterConf?:  typeof filterConfigDefault ): DataToy[] {
    const arrFilters = Object.entries(fParams);
    const filteredToys = arrFilters.reduce((accToysByCat, curCats) => {
      const [cat, arrValues] = curCats;
      return arrValues.reduce((accToys, curVal) => {
        const cValFiltered = accToysByCat.filter((item) => item[cat as keyof DataToy] === curVal);
        return [...accToys, ...cValFiltered];
      }, [] as DataToy[]);
    }, toys as DataToy[]);

    const filteredByField = (field: keyof DataToy = 'name', dir: Direction = 'asc') => {
      const res = dir === 'asc' ? 1 : -1;
      return (a: DataToy, b: DataToy) => (a[field] > b[field] ? res : -res);
    };

    
    // const result = filtered.length ? filtered : toys;

    return filteredToys.sort(filteredByField(this.sortField, this.sortDir));
  }
}

const getToys = new Filtron(data);

export {Direction, Obj, getToys};