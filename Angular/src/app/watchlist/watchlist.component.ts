import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  @Input() itemElement;
  @Output() deleter = new EventEmitter ();
  arrowUp: boolean;

  companyName: string;
  ticker: string;
  lastPrice: number;
  change: number;
  changePercent: number;
  isLoading: boolean = true;

  constructor() { }

  ngOnInit(): void {
 //   console.log ('inside WATCHLIST');
 //   console.log (this.itemElement['ticker'])
 if (this.itemElement['change'] > 0)
    this.arrowUp = true;
else
this.arrowUp = false;

this.companyName = this.itemElement['companyName'];
this.ticker = this.itemElement ['ticker'];
this.lastPrice = this.itemElement['lastPrice'];
this.change = this.itemElement['change'];
//console.log ('CHANGE VALUE IS '+ this.change);
this.changePercent = this.itemElement ['changePercent'];

this.isLoading = false;

  }

delete ()
{
  this.deleter.emit (this.itemElement['ticker']);
}

getColor()
{
   if(this.itemElement['change'] >0)
     return 'green';
 else if (this.itemElement['change'] < 0)
 return 'red';
 else
 return 'black';
}


}
