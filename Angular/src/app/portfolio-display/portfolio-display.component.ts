import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-portfolio-display',
  templateUrl: './portfolio-display.component.html',
  styleUrls: ['./portfolio-display.component.css']
})


export class PortfolioDisplayComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }
  portList: {}[] = []
  portListModified: {}[] = [];

  isEmpty: boolean = false;
  ngOnInit(): void {


    this.route.params.subscribe ((params: Params) => {


     // console.log ('INSIDE PORTFOLIO DISPLAY');


      this.portList = JSON.parse(localStorage.getItem("ports") || "[]");
      if (this.portList.length > 0)
      {
          this.portList.sort((a, b) => (a['ticker'] > b['ticker']) ? 1 : -1)
      }

      if (this.portList.length ==0)
      {
          this.isEmpty = true;
      }


      for (var index in this.portList)
      {

          var dataob = this.portList[+index];
          var tick = dataob ['ticker']


     // change this
     this.http.get('http://apcscihw7.us-east-1.elasticbeanstalk.com/summary?keyword='+tick).subscribe ((data) => {

            var datab = {};


           // datab['ticker'] = tick;

            this.portList[+index]['lastPrice'] = data['lastPrice'];
            //datab['lastPrice'] = data['lastPrice'];


            //datab['quantity'] = this.portList[+index]['quantity'];


            ///datab['companyName'] = this.portList[+index]['companyName'];
           //// datab['total'] = this.portList[+index]['total'];
            this.portList[+index]['marketValue'] = this.portList[+index]['lastPrice'] * this.portList[+index]['quantity'];
          //  datab['marketValue'] = datab['lastPrice'] * this.portList[+index]['quantity'];
          //  datab['marketValue'] = datab['marketValue'].toFixed(2);
          this.portList[+index]['marketValue'] = this.portList[+index]['marketValue'].toFixed(2);
            //datab['marketValue'] = datab['marketValue'].toFixed(2);
            //datab['avg'] = this.portList[+index]['avg'];
            console.log (this.portList[+index]['lastPrice'] +" "+ this.portList[+index]['avg']);
            this.portList[+index]['change'] =  this.portList[+index]['lastPrice'] - this.portList[+index]['avg'];

            //datab['change'] = -this.portList[+index]['avg'] + datab['lastPrice'];
            //this.portListModified.push (datab);
            //console.log (this.portListModified.length);
          })
      }
      localStorage.setItem("ports", JSON.stringify(this.portList));
  })
  }



updater()
{
  this.portListModified = [];
  this.portList = JSON.parse(localStorage.getItem("ports") || "[]");
  if (this.portList.length > 0)
  {
      this.portList.sort((a, b) => (a['ticker'] > b['ticker']) ? 1 : -1)
  }

  if (this.portList.length ==0)
  {
      this.isEmpty = true;
  }


  for (var index in this.portList)
  {

      var dataob = this.portList[+index];
      var tick = dataob ['ticker']



 // change API endpoint
 this.http.get('http://apcscihw7.us-east-1.elasticbeanstalk.com/summary?keyword='+tick).subscribe ((data) => {

        var datab = {};


        datab['ticker'] = tick;
        this.portList[+index]['lastPrice'] = data['lastPrice'];
       // datab['lastPrice'] = data['lastPrice'];


       // this.portList[+index]['quantity'] = this.port
        datab['quantity'] = this.portList[+index]['quantity'];


        //datab['companyName'] = this.portList[+index]['companyName'];
        //datab['total'] = this.portList[+index]['total'];

        this.portList[+index]['marketValue'] = this.portList[+index]['lastPrice'] * this.portList[+index]['quantity'];
       // datab['marketValue'] = datab['lastPrice'] * this.portList[+index]['quantity'];
        this.portList[+index]['marketValue'] = this.portList[+index]['marketValue'].toFixed(2);
        //datab['marketValue'] = datab['marketValue'].toFixed(2);
        //datab['avg'] = this.portList[+index]['avg'];
        this.portList[+index]['change'] = this.portList[+index]['lastPrice'] - this.portList[+index]['avg'];
        //datab['change'] = -this.portList[+index]['avg'] + datab['lastPrice'];
        //this.portListModified.push (datab);
        //console.log (this.portListModified.length);
      })
  }
      localStorage.setItem("ports", JSON.stringify (this.portList));
}
}
