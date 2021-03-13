import { Rate } from "../../services/CurrencyApi/models";
import { Action } from "../models";

const updateRates = (payload: Rate): Action => {
  return {
    type: 'UPDATE_RATES',
    payload
  }
}

const updateBaseCurrency = (payload: string): Action => {
  return {
    type: 'UPDATE_BASE_CURRENCY',
    payload
  }
}

export {
  updateRates,
  updateBaseCurrency
}