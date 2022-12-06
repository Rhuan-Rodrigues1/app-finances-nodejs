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

    addValue(value: number) {
        this.values.push(value)

        if (this.values.length == 1) { this.open = value }


        if (this.low > value) { this.low = value }

        if(this.high < value) { this.high = value }
    }

    closeCandles() {
        if (this.values.length > 0) {
            this.close = this.values[this.values.length - 1]
            this.finalDateTime = new Date()

            if(this.open > this.close) { 
                this.color = CandleColors.RED

            } else if(this.open < this.close) {
                this.color = CandleColors.GREEN
            }

        }
    }

    toSimpleObject() {
        const { values, ...obj } = this

        return obj
    }
}