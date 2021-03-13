import { RatesResponse, Rate } from './models'

/**
 * There is a class to handle API requests to external service.
 * The external service is Fixer.io (https://fixer.io/)
 */
class CurrencyApi {
  /**
   * @todo Unhardcode
   */
  public apiKey: string = "559379357438a0008c14facce9454451";
  public apiBase: string = "http://data.fixer.io/api/";

  /**
   * Base currency is "EUR"
   * @returns Promise with rates in object shape
   */
  public getCurrencyRates(): Promise<RatesResponse> {
    return fetch(
      `${this.apiBase}/latest?access_key=${this.apiKey}`
    ).then((response) => response.json()).then(result => {
      if ( ! result.success ) {
        throw new Error(result);
      }
      return result;
    });
  }

  public convert(rates: Rate, from: string, to: string, qty: number): number {
    if (!rates[from] || !rates[to]) return 0;

    let value: number;

    if (from === 'EUR') {
      value = qty * rates[to];
    } else if (to === 'EUR') {
      value = (1 / rates[from]) * qty;
    } else {
      value = (rates[to] / rates[from]) * qty;
    }

    // Round to two decimal places
    return Number(value.toFixed(2));
  }

}

export default CurrencyApi;
