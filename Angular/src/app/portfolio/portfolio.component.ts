import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from '@angular/platform-browser';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  @Input() itemElement;
  @Output() buyOutput = new EventEmitter();
  @Output() sellOutput = new EventEmitter();

//  @Output() deleter = new EventEmitter ();
  items: {}[] = []
  indexer: number = 0;
  buyer: number  =0;
  seller: number  =0;
  ticker: string;
  lastPrice: number ;
  quantity: number;
  change: number;
  marketValue: number;
  total: number;
  avg: number
  arrowUp: boolean;
  companyName: string;

  constructor(private router: Router, private modalService: NgbModal) { }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log ('result value is '+ result);
      //this.buyme();
      if (result =='Buy')
      this.buyme();
      else
        this.sellme();
   //   this.closeResult = `Closed with: ${result}`;
    }, (reason) => {

      // do nothing;
     // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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




  ngOnInit(): void {

    this.ticker = this.itemElement['ticker'];
    this.lastPrice = this.itemElement['lastPrice'];
    this.quantity = this.itemElement['quantity'];
    this.change = this.itemElement['change'];
    this.marketValue = this.itemElement['marketValue'];
    this.total = this.itemElement['total'];
    this.avg = this.itemElement['avg'];
    this.companyName = this.itemElement['companyName'];



    this.items = JSON.parse(localStorage.getItem("ports") || "[]");
    for (var indx in this.items)
    {
        if (this.items[+indx]['ticker'] == this.itemElement['ticker'])
        {
          this.indexer = +indx;
          break;
        }
    }

    this.checker();
  }

buyme ()
{

    var coster = this.buyer * this.items[this.indexer]['lastPrice']

    this.items [this.indexer]['total'] += coster;
    this.items[this.indexer]['quantity'] += this.buyer;
    //this.items[this.indexer]['avg'] = this.items [this.indexer]['total'] / this.items[this.indexer]['quantity'];
    //this.items[this.indexer]['marketValue'] = this.items[this.indexer]['quantity'] * this.items[this.indexer]['lastPrice'];
    //this.items[this.indexer]['change'] = -this.items[this.indexer]['avg'] +this.items[this.indexer]['lastPrice'];
    localStorage.setItem ('ports', JSON.stringify(this.items));
    this.buyOutput.emit ();
    this.router.navigate(['/portfolio']);
}

sellme () {

  var coster = this.seller * this.items[this.indexer]['lastPrice']
  this.items [this.indexer]['total'] -= coster;
  this.items[this.indexer]['quantity'] -= this.seller;
  //this.items[this.indexer]['avg'] = this.items [this.indexer]['total'] / this.items[this.indexer]['quantity'];
  //this.items[this.indexer]['marketValue'] = this.items[this.indexer]['quantity'] * this.items[this.indexer]['lastPrice'];
  //this.items[this.indexer]['change'] = -this.items[this.indexer]['avg'] +this.items[this.indexer]['lastPrice'];
  if (this.items[this.indexer]['quantity'] ==0 )
  {
    // deleting that element from the array
      this.items.splice (this.indexer,1);
  }
  localStorage.setItem ('ports', JSON.stringify(this.items));
  this.sellOutput.emit();
  this.router.navigate(['/portfolio']);

}


checker ()
{
 // console.log ('inside checker');
  if (this.change > 0)
    this.arrowUp = true;
  else
    this.arrowUp =false;
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


}
