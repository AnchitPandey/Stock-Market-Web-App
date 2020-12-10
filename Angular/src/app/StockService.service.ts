export class StockService
{
    tickerSymbol : string = null;
    companyName: string = null;
    exchangeCode: string = null;
    lastPrice: number  = null;
    currentTimeStamp: string = null;
    change: number= null;
    changePercent: number = null;
    marketStatus: boolean = false;
    highPrice: number = null;
    lowPrice: number = null;
    openPrice: number = null;
    prevClose: number = null;
    volume: number = null;
    midPrice: number = null;
    askPrice: number= null;
    askSize: number = null;
    bidPrice: number = null;
    bidSize: number = null;
    companydescription: string = null;
    newsUrl: string = null;
    newsTitle: string = null;
    newsDescription: string = null;
    newsSource: string = null;
    newsUrlToImage: string = null;
    newsPublishedAt: string = null;
    timestamp: string = null;
    startDate: string = null;
    description: string = null;



    updateStockDetails (ticker, company, exch, startDate, description)
    {
        this.tickerSymbol = ticker;
        this.companyName = company;
        this.exchangeCode = exch;
        this.startDate = startDate;
        this.description = description;
    }

    updateStockSummary (lastp, currtime, chain, changeper, marketStat, highp, lowp,openp, prevc, vol, midp, askp, asksz, bidp, bidsz, timestamp)
    {
        this.highPrice = highp;
        this.lowPrice = lowp;
        this.openPrice = openp;
        this.prevClose = prevc;
        this.volume = vol;
        this.midPrice = midp;
        this.askPrice = askp;
        this.askSize = asksz;
        this.bidPrice = bidp;
        this.bidSize = bidsz;
        this.lastPrice = lastp;
        this.currentTimeStamp = currtime;
        this.change= chain;
        this.changePercent = changeper;
        this.marketStatus = marketStat;
        this.timestamp = timestamp;
      }

      dummyInitializationStockDetails() {
          this.tickerSymbol = 'NVDA';
          this.companyName = 'Nvidia Corp'
          this.exchangeCode=  'nasdeq';
      }

      dummyInitializationStockSummary() {

        this.highPrice = this.randomIntFromInterval (-500,500);
        this.lowPrice = this.randomIntFromInterval (-500,500);
        this.openPrice = this.randomIntFromInterval (-500,500);
        this.prevClose = this.randomIntFromInterval (-500,500);
        this.volume = this.randomIntFromInterval (0,500);
        this.midPrice = this.randomIntFromInterval (-500,500);
        this.askPrice = this.randomIntFromInterval (-500,500);
        this.askSize = this.randomIntFromInterval (0,500);
        this.bidPrice =this.randomIntFromInterval (-500,500);
        this.bidSize = this.randomIntFromInterval (0,500);
        this.lastPrice = this.randomIntFromInterval (-500,500);
        var d = new Date();
        this.currentTimeStamp = d.toString();
        this.change = this.randomIntFromInterval (-500,500);
        this.changePercent =this.randomIntFromInterval (-10,10);
        this.marketStatus = true;

      }
       randomIntFromInterval(min, max) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
      }

}
