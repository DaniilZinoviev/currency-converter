import { Rate } from '../../services/CurrencyApi/models';
import { AppStore, Action } from '../models'

const initialStore: AppStore = {
  baseCurrency: 'USD',
  rates: {}
}


const reducer = (store: AppStore = initialStore, action: Action) => {
  switch (action.type) {
    case 'UPDATE_RATES':
      return {
        ...store,
        rates: action.payload
      }
    default:
      return store;
  }
}

export default reducer;