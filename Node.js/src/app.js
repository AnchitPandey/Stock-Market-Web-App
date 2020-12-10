const express = require ('express')
const app = express()

const fetch = require('node-fetch');
var path = require('path');


var cors = require ('cors')
app.use (cors())

/*

app.get ('', (req, res) =>{
    res.send ('Hello Express !')
})

*/

// autocomplete API

app.get ('/autocomplete', (req, res) =>{

    console.log ("I got invoked ..");    
    var keyw = req.query.keyword
    const urlAutocomplete = 'https://api.tiingo.com/tiingo/utilities/search?query='+keyw+'&token=dba09041d3f74d6661a2e620087813c35682f331'
    fetch (urlAutocomplete, {method: 'GET',mode: 'no-cors'}).then((response) =>  {
        response.json().then ((data) => {
             res.send (data);  
        })
    })   
  //  res.send ('check terminal');
})


// stock details 
app.get ('/stockdetails', (req, res) =>{
    
    var keyw = req.query.keyword
    const urlStockDetails = 'https://api.tiingo.com/tiingo/daily/'+keyw+'?token=dba09041d3f74d6661a2e620087813c35682f331'
    fetch (urlStockDetails).then((response) =>  {
        response.json().then ((data) => {
            var dataobj ={}        
            dataobj['ticker'] = data['ticker'];
      ////      console.log (dataobj['ticker']);
            dataobj['companyName'] = data['name'];
      ////      console.log (dataobj['companyName']);
            dataobj['exchangeCode'] = data['exchangeCode'];
     ///       console.log (dataobj['exchangeCode']);
            dataobj['description'] = data['description'];
      //      console.log (dataobj['description']);
            dataobj['startDate'] = data['startDate'];
            res.send (dataobj);
        })
    })    
    //res.send (dataobj)
})

// stock summary (table 4.2)
app.get ('/summary', (req, res) =>{

    var keyw = req.query.keyword
    const urlSummary = 'https://api.tiingo.com/iex?tickers='+keyw+'&token=dba09041d3f74d6661a2e620087813c35682f331';
    //const urlStockDetails = 'https://api.tiingo.com/tiingo/daily/AAPL?token=dba09041d3f74d6661a2e620087813c35682f331'
    fetch (urlSummary).then((response) =>  {
        response.json().then ((data) => {
            

            dataobj = {}   
            data = data[0];      J
            dataobj ['lastPrice'] = data['last'].toFixed(2);
            dataobj['prevClose'] = data['prevClose'].toFixed(2);
            dataobj['change'] = dataobj['lastPrice'] - dataobj['prevClose'];
            dataobj['change'] = dataobj['change'].toFixed(2);
          //  console.log (dataobj['change'])
            dataobj['changePercent'] = dataobj['change'] / dataobj['prevClose'] * 100;
            dataobj['changePercent'] = dataobj['changePercent'].toFixed(2);
          //  console.log ('change percent is '+ dataobj['changePercent']);
            const currentTime = new Date();
           
            var day = currentTime.getDate();
            if (day < 10)
            day  ='0'+ day;
            var month = currentTime.getMonth();
            month+=1;
            if (month < 10)
            month  ='0'+ month;
            var year = currentTime.getFullYear();
            var hour = currentTime.getHours();
            if (hour < 10)
            hour  ='0'+ hour;


            var min = currentTime.getMinutes();
            if (min < 10)
            min  ='0'+ min;

            var sec = currentTime.getSeconds();  
            if (sec < 10)
            sec  ='0'+ sec;
          
            var dtString = year+'-'+month+'-'+day+' '+hour+":"+min+":"+sec;
           // console.log (dtString);
           // dataobj['currentTimeStamp'] = currentTime.toString();
            dataobj['currentTimeStamp'] = dtString;
     //       console.log ('current time stamp is '+dataobj['currentTimeStamp']);

            //console.log(dataobj['currentTimeStamp']);
            var timestamp = new Date(data['timestamp']);           


             day = timestamp.getDate();
             if (day < 10)
                 day  ='0'+ day;
             month = timestamp.getMonth();
             month+=1;
             if (month < 10)
             month  ='0'+ month;
             year = timestamp.getFullYear();
             hour = timestamp.getHours();
             if (hour < 10)
                hour  ='0'+ hour;

             min = timestamp.getMinutes();
            if (min < 10)
                min = '0' + min;
             sec = timestamp.getSeconds();  
             if (sec < 10)
                sec = '0' +sec;
             dtString = year+'-'+month+'-'+day+' '+hour+":"+min+":"+sec;
             dataobj['timestamp'] = dtString;
 //            console.log ('API time stamp is '+dataobj['timestamp']);
            
            //dataobj['timestamp'] = data['timestamp'];
           // const timestamp  = new Date(data['timestamp']) ;
            
            //const secondsPassed =  (currentTime.getSeconds() - timestamp.getSeconds()) / 1000;
            var secondsPassed = (currentTime.getTime() - timestamp.getTime()) / 1000;
     //       console.log ('seconds passed is '+ secondsPassed);
            var marketClosed = true;
            
            if (secondsPassed <= 60)
                marketClosed = false;

                dataobj['marketStatus'] = marketClosed;

 //               console.log ('marketclosed is '+marketClosed);

                dataobj['highPrice'] = data['high'].toFixed(2);
                dataobj['lowPrice'] = data['low'].toFixed(2);

                if (!data['mid'] && !dataobj['marketStatus'])
                    dataobj['midPrice'] = '-'
                
                if (data['mid'])
                    dataobj['midPrice'] = data['mid'].toFixed(2);


            if (data['volume'])
                dataobj['volume'] = data['volume'].toFixed(2);

                if (data['bidPrice'])
                dataobj['bidPrice'] = data['bidPrice'].toFixed(2);


               if (data['bidSize'])
                dataobj['bidSize'] = data['bidSize'].toFixed(2);

               if (data['askPrice'])
                dataobj['askPrice'] = data['askPrice'].toFixed(2);

                if (data['askSize'])
                dataobj['askSize'] = data['askSize'].toFixed(2);


                if (data['open'])
                dataobj['openPrice'] = data['open'].toFixed(2);




                //dataobj['highPrice'] = data['high'].toFixed(2);
                //dataobj['lowPrice'] = data['low'].toFixed(2);
               // dataobj['midPrice'] = data['mid'].toFixed(2);
            
            if (!dataobj['marketStatus'] && !dataobj['midPrice'])
                dataobj['midPrice'] = '-';
            //dataobj['volume'] = data['volume'].toFixed(2);
            //dataobj['bidPrice'] = data['bidPrice'].toFixed(2);
            //dataobj['bidSize'] = data['bidSize'].toFixed(2);
            //dataobj['askPrice'] = data['askPrice'].toFixed(2);
            //dataobj['askSize'] = data['askSize'].toFixed(2);
            //dataobj['openPrice'] = data['open'].toFixed(2);
            res.send (dataobj);
  
        
        })
    })    
    
})


app.get ('/news', (req, res) =>{

    var keyw = req.query.keyword
    //console.log ('INSIDE NEWS')
    const urlNews = 'https://newsapi.org/v2/everything?apiKey=6e16e72a27944e5a9ba21dd5a03fe420&q='+keyw;
    var newsObject = []
    maxLength = 20;
    fetch (urlNews).then((response) =>  {
        response.json().then ((data) => {
            var counter = 0;
            for (var index in data.articles)
            {
                
                dataObject = {}

                index = +index;
                
                var publisher = data.articles[index]['source']['name']

                var publishedDate = data.articles[index]['publishedAt'];

                var title = data.articles[+index]['title'];

                var description = data.articles[index]['description'];

                var url = data.articles[index]['url'];

                var urlToImage =  data.articles[index]['urlToImage'];


                dataObject['publisher'] = publisher;
                dataObject['publishedAt'] = publishedDate;
                dataObject['title'] = title;
                dataObject['description'] = description;
                dataObject['url'] = url;
                dataObject['urlToImage']= urlToImage;
                newsObject.push (dataObject);
                counter+=1;
                if (counter == 20)
                    break;
             
            }
            res.send (newsObject);  
        })
    })    
 ///   console.log('I REACHED HERE');
 ///   console.log (newsObject.length);
    
})


app.get ('/charts', (req, res) =>{

    
    const urlCharts = 'https://api.tiingo.com/iex/AAPL/prices?startDate=2019-09-10&resampleFreq=4min&token=dba09041d3f74d6661a2e620087813c35682f331'

    fetch (urlCharts).then((response) =>  {
        response.json().then ((data) => {    
         res.send (data);
        })
    })    
    res.send ('check terminal')
})

app.get ('/history', (req, res) =>{

    console.log ('I got called');
    keyw = req.query.keyword
    console.log ('keyword is '+ keyw);
    starter = req.query.startDate
    starter = starter.split(" ")[0];
    console.log ('startDate is '+ starter);

    var dt = new Date (starter);
    dt.setFullYear(dt.getFullYear() -2);
    var yr = dt.getFullYear();
    var mnth = dt.getMonth() +1;
    var dy = dt.getDate();
    var newmnth, newdy;
    if  (mnth < 10)
        newmnth = '0'+mnth;
    else
        newmnth = mnth;

    if (dy < 10)
        newdy = '0'+dy;
    else
        newdy = dy;

    var dater = yr +'-'+ newmnth+'-'+ newdy;
    console.log ('the date I am sending is '+ dater);

    const urlCharts = 'https://api.tiingo.com/tiingo/daily/'+keyw+'/prices?startDate='+dater+'&token=dba09041d3f74d6661a2e620087813c35682f331'
    fetch (urlCharts).then((response) =>  {
        response.json().then ((data) => {
        var counter =0;
        for (var indi in data)
        {
                counter+=1;
        }    
        console.log ('datalengt is '+ counter);
         res.send (data);
        })
    })    
   // res.send ('check terminal')
})







app.get ('/daily', (req, res) =>{


   const keyw = req.query.keyword;
   var startDate = req.query.startDate;
   startDate = startDate.split(" ")[0];
   console.log ('startDate I g6ot is '+startDate);
   //console.log ('######### INSIDE daily #########')
  // console.log ('keyword is '+ keyw);
  // console.log ('startDate is '+ startDate);
   const urlCharts = 'https://api.tiingo.com/iex/'+keyw+'/prices?startDate='+startDate+'&resampleFreq=4min&token=dba09041d3f74d6661a2e620087813c35682f331'
    
    // dba09041d3f74d6661a2e620087813c35682f331
    fetch (urlCharts).then((response) =>  {
        response.json().then ((data) => {   
                res.send (data);
        })
    })    
})

app.get ('/latest', (req, res) =>{

    const urlCharts = 'https://api.tiingo.com/iex?tickers=AAPL&token=dba09041d3f74d6661a2e620087813c35682f331'
    // dba09041d3f74d6661a2e620087813c35682f331
    var datee = new Date ('2020-11-04T21:00:00+00:00');   
    res.send ('_|_');    
    fetch (urlCharts).then((response) =>  {
        response.json().then ((data) => {    
            //console.log(data);
            //console.log (typeof data);
            console.log (typeof data[0]['timestamp']);
            //console.log (data[0]['timestamp']);
            //console.log(typeof data[0]['timestamp']);
            res.send (data);
        })
    })
})





  
  app.use('' ,express.static(path.join(__dirname, 'dist/material-demo')));


  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/material-demo/index.html'));
  })




app.listen (8080, () => {
    console.log ('Server is upon port 3000')
})





