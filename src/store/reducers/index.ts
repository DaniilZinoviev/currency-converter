import { AppState, Action } from '../models'

const initialState: AppState = {
  baseCurrency: 'USD',
  rates: {}
}


const reducer = (state: AppState = initialState, action: Action) => {
  switch (action.type) {
    case 'UPDATE_RATES':
      return {
        ...state,
        rates: action.payload
      }
    default:
      return state;
  }
}

export default reducer;