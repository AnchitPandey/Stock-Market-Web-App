import { Component, ViewChild, OnInit, ElementRef, Renderer2 } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'material-demo';
  notifications = 0;
  isFetcing = false;
  isMenuCollapsed = true;

  @ViewChild('searchButton', {static: true}) sb : ElementRef;
  @ViewChild('watchListButton', {static: true}) wl: ElementRef;
  @ViewChild('portfolioButton', {static: true}) pf: ElementRef;

  constructor (private http: HttpClient, private renderer: Renderer2, private router: Router){
console.log ('constructor called');
//localStorage.clear();
  }
  ngOnInit()
  {
    this.renderer.setStyle(this.sb.nativeElement, 'border', '2px solid white');
    this.renderer.setStyle(this.wl.nativeElement, 'border', 'none');
    this.renderer.setStyle(this.pf.nativeElement, 'border', 'none');
    this.renderer.setStyle(this.sb.nativeElement, 'color', 'white');
    console.log ('app component started');

  }


  sender ()
  {
    this.isFetcing = true;

    // change endpoint
this.http.get('http://localhost:3000/autocomplete').subscribe (stockData => {
  this.isFetcing = false;
  console.log (stockData);
}, error => {
    console.log (error.message);
})
  }

  chalMaiChala()
  {
    this.renderer.setStyle (this.sb.nativeElement, 'border', '2px solid white');
    this.renderer.setStyle (this.wl.nativeElement, 'border', 'none');
    this.renderer.setStyle (this.pf.nativeElement, 'border', 'none');
    this.renderer.setStyle (this.sb.nativeElement, 'color', 'white');
    this.renderer.setStyle(this.pf.nativeElement, 'color', '#DCDCDC');
    this.renderer.setStyle(this.wl.nativeElement, 'color', '#DCDCDC');
    this.router.navigate (['/'])


  }


  hover1 ()
  {
    this.renderer.setStyle(this.sb.nativeElement, 'color', 'white');
  }

  leave1 ()
  {
    if (this.sb.nativeElement.style.border == 'none')
    this.renderer.setStyle(this.sb.nativeElement, 'color', '#DCDCDC');
  }


  hover2 ()
  {
    this.renderer.setStyle(this.wl.nativeElement, 'color', 'white');
  }

  leave2 ()
  {
    if (this.wl.nativeElement.style.border == 'none')
    this.renderer.setStyle(this.wl.nativeElement, 'color', '#DCDCDC');
  }

  hover3 ()
  {
    this.renderer.setStyle(this.pf.nativeElement, 'color', 'white');
  }

  leave3 ()
  {
    if (this.pf.nativeElement.style.border == 'none')
    this.renderer.setStyle(this.pf.nativeElement, 'color', '#DCDCDC');
  }

  searchClicked()
  {
    // set style
    this.renderer.setStyle (this.sb.nativeElement, 'border', '2px solid white');
    this.renderer.setStyle (this.wl.nativeElement, 'border', 'none');
    this.renderer.setStyle (this.pf.nativeElement, 'border', 'none');
    this.renderer.setStyle (this.sb.nativeElement, 'color', 'white');
    this.renderer.setStyle(this.pf.nativeElement, 'color', '#DCDCDC');
    this.renderer.setStyle(this.wl.nativeElement, 'color', '#DCDCDC');
    this.router.navigate (['/'])



// do some action
  }

  watchListClicked()
  {
    this.renderer.setStyle (this.wl.nativeElement, 'border', '2px solid white');
    this.renderer.setStyle (this.sb.nativeElement, 'border', 'none');
    this.renderer.setStyle (this.pf.nativeElement, 'border', 'none');
    this.renderer.setStyle (this.wl.nativeElement, 'color', 'white');
    this.renderer.setStyle(this.sb.nativeElement, 'color', '#DCDCDC');
    this.renderer.setStyle(this.pf.nativeElement, 'color', '#DCDCDC');
    this.router.navigate (['/watchlist']);

// do some action
  }

  portfolioClicked()
  {
    this.renderer.setStyle (this.pf.nativeElement, 'border', '2px solid white');
    this.renderer.setStyle (this.wl.nativeElement, 'border', 'none');
    this.renderer.setStyle (this.sb.nativeElement, 'border', 'none');
    this.renderer.setStyle (this.pf.nativeElement, 'color', 'white');
    this.renderer.setStyle(this.sb.nativeElement, 'color', '#DCDCDC');
    this.renderer.setStyle(this.wl.nativeElement, 'color', '#DCDCDC');
    this.router.navigate (['/portfolio']);
// do some action
  }

}
