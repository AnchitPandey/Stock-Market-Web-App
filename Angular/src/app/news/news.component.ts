import { Component, OnInit, Input } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {


  @Input() newsData;

  urlToImage: string;
  description: string;
  title: string;
   publishedAt:Date;
   url: string;
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  monthName: string;
  day: number;
  year: number;
  dateString: string;
  headline: string;
  twitterText: string;
  facebookText: string;
  twitterURL: string = "https://twitter.com/intent/tweet?text=";
  sourceName: string;
  constructor(private http: HttpClient, private modalService: NgbModal) { }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log ('CLOSED MODAL CALLED');

   //   this.closeResult = `Closed with: ${result}`;
    }, (reason) => {

      // do nothing;

    });
  }


  ngOnInit(): void {
  //  console.log ('inside news')

    this.urlToImage = this.newsData['urlToImage']
    this.description = this.newsData['description'];
    this.title = this.newsData['title'];
    var dt = this.newsData['publishedAt'];
    this.url = this.newsData['url'];
    this.sourceName = this.newsData['publisher'];

    var d = new Date(dt);
    this.monthName= this.months[d.getMonth()];
    this.day = d.getDate();
    this.year = d.getFullYear();
  this.dateString = this.monthName +' '+ this.day +', '+ this.year;

    this.headline = this.title.split(' ')[0];


    //this.twitterText = this.title +" "+ this.url;
    this.twitterURL += encodeURIComponent (this.title) + '%20' + encodeURIComponent (this.url);
    /*
    this.http.get ('http://localhost:3000/news').subscribe ((data) => {
      this.urlToImage = data[0]['urlToImage']
      this.description = data[0]['description'];
      this.title = data[0]['title'];
      var dt = data[0]['publishedAt'];
      this.url = data[0]['url'];

      console.log ('date is '+ dt);
      console.log (typeof dt);
      var d = new Date(dt);
      this.monthName= this.months[d.getMonth()];
      this.day = d.getDate();
      this.year = d.getFullYear();
    this.dateString = this.monthName +' '+ this.day +', '+ this.year;
      console.log('datestring is '+ this.dateString);
      this.headline = this.title.split(' ')[0];
      console.log ('headline is '+ this.headline);
    })
    */

  }
}
