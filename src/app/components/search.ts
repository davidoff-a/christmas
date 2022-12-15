import data from '../../data';
import { DataToy } from '../pages/appToysPage';

function filterToys(bigData: DataToy[], filterField: keyof DataToy, filterQuery: string): DataToy[] {
  if (filterField === 'favorite') {
    return bigData.filter((item: DataToy) => item[filterField]);
  }
  const filteredData: DataToy[] = bigData.filter((item: DataToy) => item[filterField].toLowerCase().includes(filterQuery.toLowerCase()));
  localStorage.setItem('filteredArr', JSON.stringify(filteredData));

  return filteredData;
}

function filterToysByNumValues(bigData: DataToy[], filterField: keyof DataToy, filterQuery: number[]): DataToy[] {
  if (filterField === 'favorite') {
    return bigData.filter((item: DataToy) => item[filterField]);
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
    (item: DataToy) => Number(item[filterField]) <= max && Number(item[filterField]) >= min,
  );
  localStorage.setItem('filteredArr', JSON.stringify(filteredData));

  return filteredData;
}

function minMaxValues(bigData: DataToy[], searchField: keyof DataToy, sortingDirection: string): number {
  const limitValue = [...bigData].sort(dynamicSort(searchField, sortingDirection))[0][searchField];
  return +limitValue;
}

function dynamicSort(sortField: keyof DataToy = 'name', sortDirection: string = 'asc') {
  const sortOrder = sortDirection === 'asc' ? 1 : -1;

  return function (a: DataToy, b: DataToy) {
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
