import { config } from "dotenv";
import { InternalError } from "./utils/errors/InternalError";
import axios, {AxiosError} from "axios";

config()

export class ClientRequestError extends InternalError {
    constructor(message: string) {
      const internalMessage =
        'Unexpected error when trying to communicate to coingecko';
      super(`${internalMessage}: ${message}`);
    }
  }

const readPrice = async (): Promise<any> => {
    try {
        const result = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
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


readPrice()
