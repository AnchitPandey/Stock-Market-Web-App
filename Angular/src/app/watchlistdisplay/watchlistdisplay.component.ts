import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-watchlistdisplay',
  templateUrl: './watchlistdisplay.component.html',
  styleUrls: ['./watchlistdisplay.component.css']
})

export class WatchlistdisplayComponent implements OnInit {

  watchListItems: {}[] = []
 // watchListItemsModified: {}[] = []
  isEmpty: boolean = false;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
      this.isEmpty = false;
      this.watchListItems = JSON.parse(localStorage.getItem("stocker") || "[]");
      console.log ('Watchlist item has the following data '+ this.watchListItems);
        if (this.watchListItems.length > 0)
      {
          this.watchListItems.sort((a, b) => (a['ticker'] > b['ticker']) ? 1 : -1)
      }
      else
      {
          this.isEmpty = true;
          return;
      }

      console.log ('Watchlist item has the following data '+ this.watchListItems);

      for (var index in this.watchListItems)
      {

          var dataob = this.watchListItems[+index];
          var tick = dataob ['ticker']


          // change this
          this.http.get('http://apcscihw7.us-east-1.elasticbeanstalk.com/summary?keyword='+tick).subscribe ((data) => {
            var datab = {};


            this.watchListItems[+index]['lastPrice'] = data['lastPrice'];
            this.watchListItems[+index]['change'] = data['change'];
            this.watchListItems[+index]['changePercent'] = data['changePercent'];

            //datab['ticker'] = tick;
            //datab['lastPrice'] = data['lastPrice'];
            //datab['change'] = data['change']
            //datab['changePercent'] = data['changePercent'];
            //datab['companyName'] = dataob['companyName'];

            //this.watchListItemsModified.push (datab);
          })
      }
      localStorage.setItem("stocker", JSON.stringify (this.watchListItems));
  }

deleteElement (ticke) {

  for (var indexu in this.watchListItems)
  {


      if (this.watchListItems[+indexu]['ticker'] == ticke)
      {

        this.watchListItems.splice(+indexu, 1);

          if(this.watchListItems.length ==0)
          {
            this.isEmpty = true;
            localStorage.setItem ('stocker', JSON.stringify(this.watchListItems));
            return;
          }

      }
  }
  for (var indx in this.watchListItems)
  {
      var tick = this.watchListItems[+indx]['ticker'];

      // change this
      this.http.get('http://apcscihw7.us-east-1.elasticbeanstalk.com/summary?keyword='+tick).subscribe ((data) =>{

        this.watchListItems[+indx]['lastPrice'] = data['lastPrice'];
        this.watchListItems[+indx]['change'] = data['change']
        this.watchListItems[+indx]['changePercent'] = data['changePercent'];
      })
  }
  localStorage.setItem ('stocker', JSON.stringify(this.watchListItems));
}

}
