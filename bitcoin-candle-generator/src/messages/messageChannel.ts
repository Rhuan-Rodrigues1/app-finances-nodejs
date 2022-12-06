import { config } from "dotenv";
import { InternalError } from "../utils/errors/InternalError";
import { Channel, connect } from "amqplib";

config()

export class ConnectionChannelError extends InternalError {
    constructor(message: string) {
      const internalMessage =
        'error reading candles';
      super(`${internalMessage}: ${message}`);
    }
  }


export const createMessageChannel = async (): Promise<Channel> => {
    try {
        const connection = await connect(process.env.AMQP_SERVER)
        const channel = await connection.createChannel()
        await channel.assertQueue(process.env.QUEUE_NAME)
        console.log('channel conected');
        

        return channel
    } catch (err) {
        if(err) {
            throw new ConnectionChannelError(`Error code status: ${err.status}`)
        }
    }
}