import CandleColors from "../enums/CandleColors";

export default class Candle {
    low: number
    high: number
    open: number
    close: number
    color: CandleColors
    finalDateTime: Date
    values: number[]
    currency: string

    constructor(currency: string) {
        this.low = Infinity
        this.high = 0
        this.open = 0
        this.close = 0
        this.color = CandleColors.UNDETERMINED
        this.values = []
        this.currency = currency
    }
}