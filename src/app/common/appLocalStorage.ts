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

class LsHandler {
  constructor(){

  }

  getLsData(){}
  setLsData(config:{[key: string]:string[]}){

  }
  setDefaultData(filterData = filterConfigDefault){
    if (!localStorage.getItem('defaultFilterConfig')){
        localStorage.setItem('defaultFilterConfig', JSON.stringify(filterData));
    }
  }

}

const lsHandler = new LsHandler();

export {filterConfigDefault, lsHandler}