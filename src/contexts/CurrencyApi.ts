import { createContext } from "react";
import { CurrencyApi } from "../services";

const currencyApiContext = createContext(new CurrencyApi());

export default currencyApiContext;