import { Rate } from "../../services/CurrencyApi/models";
import { Action } from "../models";

const updateRates = (payload: Rate): Action => {
  return {
    type: 'UPDATE_RATES',
    payload
  }
}

export {
  updateRates
}