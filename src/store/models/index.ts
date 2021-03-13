import { Rate } from "../../services/CurrencyApi/models";

interface AppState {
  baseCurrency: string;
  rates: Rate;
}

interface Action {
  type: string;
  payload?: any;
}

interface ActionCreator {
  (payload: any): Action;
}

export type { AppState, ActionCreator, Action };
