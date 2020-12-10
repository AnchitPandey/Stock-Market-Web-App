import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { StockService } from '../StockService.service';
import {HttpClient} from '@angular/common/http';
import {interval, Subscription} from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as Highcharts from "highcharts/highstock";
import { Options } from "highcharts/highstock";
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import HighchartSankey from "highcharts/modules/sankey";
import HighchartsWheel from "highcharts/modules/dependency-wheel";


HighchartSankey(Highcharts);
HighchartsWheel(Highcharts);

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptionsHistory: Options

  chartsData = [[]]
  chartOptions: Options = {

    rangeSelector: {
      inputEnabled: true
  },

  chart: {
    renderTo: 'container'
  },

  xAxis: {
    type: 'datetime',
   // tickInterval: 3600 * 1000,
    labels :{
      formatter: function () {
       // var str = splitter.toString();
       // var splitter = str.split(":")
       // return splitter[0]+":"+splitter[1];
         return Highcharts.dateFormat ('%H:%M', this.value);
      }
    }
  },

  series: [
      {
        type: 'line',
        data: this.chartsData,
        color: this.getColor()
      }
    ]
  };

  closeResult = '';
  ticker: string;
  tickerSymbol: string;
  companyName: string;
  exchangeCode: string;
  giver:boolean = false;
  change: number
  changePercent: number;
  changeString: string;
  lastPrice: number = 0;
  color: string = "null";
  currentTime : string = null;
  private innerSubscription: Subscription;
  private outerSubscription: Subscription;
  private chartSubscription: Subscription;
  arrowUp: boolean = true;
  marketStatus: boolean = true;
  marketClosed: string ="";
  highPrice: number;
  lowPrice: number;
  openPrice: number;
  prevClose: number;
  volume: number;
  midPrice: number;
  askPrice:  number;
  askSize: number;
  bidPrice: number;
  bidSize: number;
  startDate: string;
  description: string;
  quantity =0 ;
  total: number = 0;
  isLoading: boolean =  true;
  incorrectTicker: boolean = false;
  watchlistAdded= false;
  watchlistpurchased = false;
  watchlistremoved = false;
  newsLength: number = 0;
  newsData: {}[] = [];
  updateFlag = false;
  historyData: any;


  constructor(private route: ActivatedRoute, private stockService: StockService, private http: HttpClient, private modalService: NgbModal) {
  //  console.log ('details component got loaded');

   }

  ngOnInit(): void {

//    console.log ('details component got loaded');

    this.isLoading =true;
    this.incorrectTicker = false;

    this.route.params.subscribe (
(params: Params) => {


  this.ticker = params['id']
  //this.stockService.tickerSymbol =  this.ticker;



  // change this
  this.http.get ('http://apcscihw7.us-east-1.elasticbeanstalk.com/stockdetails?keyword='+this.ticker).subscribe ((dataobj) => {

    // this.stockService.updateStockDetails (dataobj['ticker'], dataobj['companyName'], dataobj['exchangeCode'], dataobj['startDate'], dataobj['description']);

    this.ticker = dataobj['ticker']
    if (!this.ticker)
    {
      this.isLoading = false;
      this.incorrectTicker = true;
      return;
    }
    else
      this.incorrectTicker = false;

    this.tickerSymbol  = this.ticker;
    this.companyName = dataobj['companyName']
    this.exchangeCode = dataobj ['exchangeCode']
    this.startDate  = dataobj['startDate'];
    this.description = dataobj ['description'];

    var users = JSON.parse(localStorage.getItem("stocker") || "[]");


    for (var index in users)
    {
        if (users[+index]['ticker'] == this.tickerSymbol)
          this.giver = true;
    }


  });
});




// first time

this.innerSubscription =   this.http.get ('http://apcscihw7.us-east-1.elasticbeanstalk.com/summary?keyword='+this.ticker).subscribe ((dataobj) => {


  this.isLoading = false;
      this.lastPrice = dataobj['lastPrice'];
      this.change = dataobj['change'];
      this.changePercent = dataobj['changePercent']
      this.changeString = this.change + " ("+ this.changePercent +"%)"
      this.currentTime = dataobj ['currentTimeStamp'];
      this.marketStatus = dataobj['marketStatus'];
      this.marketClosed = dataobj['timestamp'];
      console.log ('MARKET CLOSED VaLUE IS ' +this.marketClosed);
      this.highPrice = dataobj['highPrice'];
      this.lowPrice = dataobj['lowPrice'];
      this.openPrice = dataobj['openPrice'];
      this.prevClose = dataobj['prevClose'];
      this.volume = dataobj ['volume'];
      this.midPrice = dataobj['midPrice'];
      this.askPrice = dataobj['askPrice'];
      this.askSize = dataobj['askSize'];
      this.bidPrice = dataobj['bidPrice'];
      this.bidSize = dataobj ['bidSize'];

    this.chartSubscription = this.http.get('http://apcscihw7.us-east-1.elasticbeanstalk.com/daily?keyword='+this.ticker+'&startDate='+this.marketClosed).subscribe((data) =>{

    for (var indi in data)
    {
      var obj = []

      var timerobj = data[indi]['date'];

      var timer = new Date(data[indi]['date']);
      //var secString = timer.getSeconds();


      var yr =timer.getFullYear();
      var mnth = timer.getMonth() +1;
      var dy = timer.getDate();
      var hr = timer.getHours();
      var min = timer.getMinutes();
      var sec = timer.getSeconds();

        var newdy, newmnth, newsec
        if (dy < 10)
          newdy = '0'+dy;
        else
          newdy = dy;

        if (mnth < 10)
          newmnth = '0'+mnth;
        else
          newmnth  = mnth;





        var newmin, newhr;
        if (min <10)
          newmin = '0'+min;
        else
        newmin = min;
        if (hr < 10)
          newhr = '0' + hr;
        else
          newhr = hr;

        if (sec < 10)
          newsec = '0'+sec;
        else
        newsec = sec;

        var timeString = newhr+":"+newmin+":"+newsec;
        //var timeString = yr +'-'+newmnth +'-'+newdy+' '+newhr+":"+newmin+':'+newsec;
        //console.log ('time string is '+ timeString);


        obj.push (timeString);
        obj.push (+data[indi]['close']);
        this.chartsData.push (obj);
    }

    this.handleUpdate();
    });


      if (this.marketStatus)
        this.innerSubscription.unsubscribe();

      this.checker();
      console.log ('startdate I am sending to express is ' +this.marketClosed);

      this.http.get ('http://localhost:8080/history?keyword='+this.ticker+'&startDate='+this.marketClosed).subscribe ((data) => {

      this.historyData = data;
      var ohlc = [],
      volume = [],
      dataLength = this.historyData.length

      console.log ('dataLength is '+ dataLength);

      var groupingUnits: any = [[
          'week',
          [1]
         ], [
          'month',
          [1, 2, 3, 4, 6]
      ]],

      i = 0;


      for (i; i < dataLength; i += 1) {
        ohlc.push([
            this.historyData[i]['date'], // the date
            this.historyData[i]['open'], // open
            this.historyData[i]['high'], // high
            this.historyData[i]['low'], // low
            this.historyData[i]['close'] // close
        ]);

        volume.push([
            this.historyData[i]['date'], // the date
            this.historyData[i]['volume'] // the volume
        ]);
    }


    this.chartOptionsHistory = {

      rangeSelector: {
        selected: 2
    },


    title: {
      text: this.ticker+' Historical'
    },

    chart: {
      renderTo: 'container'
    },


    subtitle: {
      text: 'With SMA and Volume by Price technical indicators'
    },

    yAxis: [{
      startOnTick: false,
      endOnTick: false,
      labels: {
          align: 'right',
          x: -3
      },
      title: {
          text: 'OHLC'
      },
      height: '60%',
      lineWidth: 2,
      resize: {
          enabled: true
      }
  }, {
      labels: {
          align: 'right',
          x: -3
      },
      title: {
          text: 'Volume'
      },
      top: '65%',
      height: '35%',
      offset: 0,
      lineWidth: 2
  }],

  tooltip: {
    split: true
  },

  plotOptions: {
    series: {
        dataGrouping: {
            units: groupingUnits
        }
    }
  },

  series: [{
    type: 'candlestick',
    name: this.ticker,
    id: this.ticker,
    zIndex: 2,
    data: ohlc
  }, {
    type: 'column',
    name: 'Volume',
    id: 'volume',
    data: volume,
    yAxis: 1
  }, {
    type: 'vbp',
    linkedTo: this.ticker,
    params: {
        volumeSeriesID: 'volume'
    },
    dataLabels: {
        enabled: false
    },
    zoneLines: {
        enabled: false
    }
  }, {
    type: 'sma',
    linkedTo: this.ticker,
    zIndex: 1,
    marker: {
        enabled: false
    }
  }]



    };


    //  console.log (data);
    })

    //console.log ('history data is '+ this.historyData);




    })  ;


    // history data





this.outerSubscription =  interval (15000).subscribe (count => {

  //this.isLoading = false;


  // change this
this.innerSubscription =   this.http.get ('http://apcscihw7.us-east-1.elasticbeanstalk.com/summary?keyword='+this.ticker).subscribe ((dataobj) => {




  //      dataobj['marketStatus'], dataobj['highPrice'], dataobj['lowPrice'], dataobj['openPrice'], dataobj['prevClose'], dataobj['volume'],
  //      this.stockService.updateStockSummary (dataobj['lastPrice'], dataobj['currentTimeStamp'], dataobj['change'],dataobj['changePercent'],
//      dataobj['midPrice'], dataobj['askPrice'], dataobj['askSize'],dataobj['bidPrice'], dataobj['bidSize'], dataobj['timestamp']);

      this.lastPrice = dataobj['lastPrice'];
      this.change = dataobj['change'];
      this.changePercent = dataobj['changePercent']
      this.changeString = this.change + " ("+ this.changePercent +"%)"
      this.currentTime = dataobj ['currentTimeStamp'];
      this.marketStatus = dataobj['marketStatus'];
      this.marketClosed = dataobj['timestamp'];
      this.highPrice = dataobj['highPrice'];
      this.lowPrice = dataobj['lowPrice'];
      this.openPrice = dataobj['openPrice'];
      this.prevClose = dataobj['prevClose'];
      this.volume = dataobj ['volume'];
      this.midPrice = dataobj['midPrice'];
      this.askPrice = dataobj['askPrice'];
      this.askSize = dataobj['askSize'];
      this.bidPrice = dataobj['bidPrice'];
      this.bidSize = dataobj ['bidSize'];

      if (this.marketClosed)
        this.innerSubscription.unsubscribe();
      this.checker();
      this.handleUpdate();
    })  ;

  }, (error) => {
    console.log ('error');
  })

this.getNewsData();


  }

  ngOnDestroy (): void {

        this.innerSubscription.unsubscribe();
        this.outerSubscription.unsubscribe();
  }

  checker ()
  {

    if (this.change > 0)
      this.arrowUp = true;
    else
      this.arrowUp =false;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

      this.watchlistpurchased = true;

      setTimeout (() =>{
        this.watchlistpurchased = false;
      }, 5000);


      var users = JSON.parse(localStorage.getItem("ports") || "[]");
      this.total= this.lastPrice * this.quantity;



      if (users.length ==0)
      {
        var dataob = {}
      //  console.log ('no portfolio initially !');
        dataob['ticker'] =  this.tickerSymbol;
        dataob['companyName'] = this.companyName;

        dataob['total'] = this.total;
        dataob['quantity'] = this.quantity;
        dataob['lastPrice'] = this.lastPrice;
        dataob['marketValue'] = this.lastPrice * this.quantity;
        dataob['marketValue']= dataob['marketValue'].toFixed (2);

      //  console.log ('MARKET VALUE IS '+ dataob['marketValue']);
        dataob['avg'] = this.total / this.quantity;
        dataob['avg'] = dataob['avg'].toFixed(2);
        dataob['change'] = this.change;

        console.log ('this ticker was not present in the localStorage ! ');


        console.log ('avg value is ' + dataob['avg']);
        console.log ('change is '+ dataob['change']);


       // dataob['change'] = dataob['lastPrice'] - dataob['avg'];
       // console.log (this.change);
        users.push (dataob);
      //  console.log('adding to empty portfolio local storage');
        localStorage.setItem ('ports', JSON.stringify (users));
      }
      else
      {
          var booleanFlag = false;
          var indi:number =0;
          for (var index in users)
          {
              if (users[+index]['ticker'] == this.tickerSymbol)
              {
                booleanFlag = true;
                indi =+index;
                break;
              }
          }

          if (booleanFlag)
          {
                users[indi]['quantity'] += this.quantity;
                users[indi]['total'] += this.total;
                users[indi]['lastPrice'] = this.lastPrice;
                users[indi]['marketValue'] = this.lastPrice * users[indi]['quantity'];
                users[indi]['marketValue'] = users[indi]['marketValue'].toFixed(2);
                users[indi]['avg'] = users[indi]['total'] / users[indi]['quantity'];
                users[indi]['avg'] = users[indi]['avg'].toFixed(2);
                users[indi]['change'] = this.lastPrice - users[indi]['avg'];
                console.log ('already present  in lcalStregae')
                console.log ('avg value is '+ users[indi]['avg']);
                console.log ('avg value is '+ users[indi]['change']);
                localStorage.setItem('ports', JSON.stringify(users));
          }



          else
          {
              var dataob = {}
              console.log ('adding first time');
              dataob['ticker'] =  this.tickerSymbol;
              dataob['companyName'] = this.companyName;
              dataob['total'] = this.total;
              dataob['quantity'] = this.quantity;
              dataob['lastPrice'] = this.lastPrice;
              dataob['marketValue'] = this.lastPrice * this.quantity;
              dataob['marketValue'] = dataob['marketValue'].toFixed(2);
              dataob['avg'] = this.total / this.quantity;
              dataob['avg'] = dataob['avg'].toFixed(2);
              dataob['change'] = dataob['lastPrice'] - dataob['avg'];
          //    console.log ('avg value is '+ dataob[indi]['avg']);
           //   console.log ('avg value is '+ dataob[indi]['change']);
              users.push (dataob);
              localStorage.setItem ('ports', JSON.stringify (users));
          }
      }

      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {

      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


getNewsData()
{
        const url = "http://apcscihw7.us-east-1.elasticbeanstalk.com/news?keyword="+ this.ticker;
        this.http.get(url).subscribe((data)=> {
        this.newsLength =0;
        for (var indi in data)
        {
            this.newsLength+=1;
            this.newsData.push (data[indi])
        }
      })
}



handleUpdate() {

  this.updateFlag = true;
  this.chartOptions.rangeSelector = {
    inputEnabled: false
  };

  this.chartOptions.title =  {
    text: this.ticker
  };

  this.chartOptions.series[0] = {
    type: 'line',
    data: this.chartsData,
    color: this.getColor()
  };


  this.chartOptions.chart = {renderTo:'container'};
  this.chartOptions.xAxis =  {type: 'datetime'};
}

adder()
{
    this.watchlistAdded = false;
}

remover()
{
  this.watchlistremoved =false;
}

purchaser  ()
{
  this.watchlistpurchased = false;
}


getColor()
   {
      if(this.change >0)
        return 'green';
      else if (this.change < 0)
        return 'red';
      else
        return 'black';
   }

   putInLocalStorage()
   {
    this.watchlistAdded = true;
    this.watchlistremoved = false;
    setTimeout (() =>{
      this.watchlistAdded = false;
    }, 5000);


      this.giver=  true;
      var users = JSON.parse(localStorage.getItem("stocker") || "[]");
      var dataob = {}
      dataob['ticker'] =  this.tickerSymbol;
      dataob['companyName'] = this.companyName;
      dataob['lastPrice'] = this.lastPrice;
      dataob ['change'] = this.change;
      dataob ['changePercent'] =  this.changePercent;
      users.push (dataob);
      localStorage.setItem("stocker", JSON.stringify(users));
   }

   removeFromLocalStorage ()
   {
    this.watchlistremoved = true;
    this.watchlistAdded = false;
    setTimeout (() =>{
      this.watchlistremoved = false;
    }, 5000);

      this.giver = false;
      var users = JSON.parse(localStorage.getItem("stocker") || "[]");
      for (var index in users)
      {
          if (users[+index]['ticker'] == this.tickerSymbol)
          {
             users.splice (+index, 1);
             localStorage.setItem("stocker", JSON.stringify(users));
          }
      }
   }
}
