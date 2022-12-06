import { config } from "dotenv";
import { InternalError } from "./utils/errors/InternalError";
import axios, {AxiosError} from "axios";
import Period from "./enums/Period";
import Candle from "./models/Candle";

config()

export class ClientRequestError extends InternalError {
    constructor(message: string) {
      const internalMessage =
        'Unexpected error when trying to communicate to coingecko';
      super(`${internalMessage}: ${message}`);
    }
  }

const readPrice = async (): Promise<number> => {
    try {
        const result = await axios.get(process.env.PRICES_API)
        const data = result.data
        const price = data.bitcoin.usd
        
        
        return price

    } catch (err) {
        const axiosError = err as AxiosError;
      if (
        axiosError instanceof Error &&
        axiosError.response &&
        axiosError.response.status
      ) {
        throw new ClientRequestError(
          `Error: ${JSON.stringify(axiosError.response.data)} Code: ${
            axiosError.response.status
          }`
        );
      }
      throw new ClientRequestError((err as { message: any }).message);
    }
}


const generateCandles = async () => {
    const loopTime = Period.ONE_MINUTE / Period.TEN_SECONDS
    const candles = new Candle('BTC')

    console.log('---------------------------------------')
    console.log('Gerando nova vela')

    while (true) {
        for(let i = 0; i < loopTime; i++) {
          const price = await readPrice()
          candles.addValue(price)
          console.log(`Preço do mercado #${i + 1} de ${loopTime}`);
          await new Promise(r => setTimeout(r, Period.TEN_SECONDS))
        }   
        
        candles.closeCandles()
        console.log('Fechando vela');
        console.log(candles.toSimpleObject());
        
        
    }
}

generateCandles()