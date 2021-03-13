interface Rate {
  [key: string]: number;
}

interface RatesResponse {
  success: boolean;
  base: string;
  rates: Rate;
}

export type {
  RatesResponse,
  Rate
}