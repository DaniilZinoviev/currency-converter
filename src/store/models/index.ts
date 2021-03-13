import { Rate } from "../../services/CurrencyApi/models";

interface AppStore {
  baseCurrency: string,
  rates: Rate
}

interface Action {
  type: string,
  payload?: any
}

interface ActionCreator {
  (payload: any): Action
}

export type {
  AppStore,
  ActionCreator,
  Action
}