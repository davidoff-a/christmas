import data from '../../data';

export interface IData {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

function filterToys(bigData: IData[], filterField: keyof IData, filterQuery: string): IData[] {
  if (filterField === 'favorite') {
    return bigData.filter((item: IData) => item[filterField]);
  }
  const filteredData: IData[] = bigData.filter((item: IData) => item[filterField].toLowerCase().includes(filterQuery.toLowerCase()));
  localStorage.setItem('filteredArr', JSON.stringify(filteredData));

  return filteredData;
}

function filterToysByNumValues(bigData: IData[], filterField: keyof IData, filterQuery: number[]): IData[] {
  if (filterField === 'favorite') {
    return bigData.filter((item: IData) => item[filterField]);
  }
  let min = minMaxValues(data, filterField, 'asc');
  let max = minMaxValues(data, filterField, 'desc');
  if (filterQuery[0] === 0 && filterQuery[1] > min) {
    min = filterQuery[1];
    max = minMaxValues(data, filterField, 'desc');
  }
  if (filterQuery[0] === 1 && filterQuery[1] < max) {
    max = filterQuery[1];
    min = minMaxValues(data, filterField, 'asc');
  }
  const filteredData = bigData.filter(
    (item: IData) => Number(item[filterField]) <= max && Number(item[filterField]) >= min,
  );
  localStorage.setItem('filteredArr', JSON.stringify(filteredData));

  return filteredData;
}

function minMaxValues(bigData: IData[], searchField: keyof IData, sortingDirection: string): number {
  const limitValue = [...bigData].sort(dynamicSort(searchField, sortingDirection))[0][searchField];
  return +limitValue;
}

function dynamicSort(sortField: keyof IData = 'name', sortDirection: string = 'asc') {
  const sortOrder = sortDirection === 'asc' ? 1 : -1;

  return function (a: IData, b: IData) {
    const numA = Number(a[sortField]);
    const numB = Number(b[sortField]);
    const forNum = numA < numB ? -1 : numA > numB ? 1 : 0;
    const forStr = a[sortField] < b[sortField] ? -1 : a[sortField] > b[sortField] ? 1 : 0;
    const vars: { [key: string]: number } = {
      count: forNum,
      name: forStr,
      year: forNum,
      color: forStr,
      size: forStr,
      shape: forStr,
    };
    return vars[sortField] * sortOrder;
  };
}

export { filterToys, dynamicSort, filterToysByNumValues };
