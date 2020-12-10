import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-page-component',
  templateUrl: './home-page-component.component.html',
  styleUrls: ['./home-page-component.component.css']
})
export class HomePageComponentComponent implements OnInit {
  options: string[] = ['One', 'Two', 'Three'];

  searchMoviesCtrl = new FormControl();
  filteredMovies: any;
  isLoading = false;
  errorMsg: string;
  constructor(private http: HttpClient, private router: Router) {
  }

  // http://www.omdbapi.com/?apikey=[YOUR_KEY_HERE]=
  ngOnInit(): void {
    this.searchMoviesCtrl.valueChanges
    .pipe(
      debounceTime(500),
      tap(() => {
        this.errorMsg = "";
        this.filteredMovies = [];
        this.isLoading = true;
      }),


      // change this
      switchMap(value => this.http.get("http://apcscihw7.us-east-1.elasticbeanstalk.com/autocomplete?keyword=" + value)
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
      )
    )
    .subscribe(data => {
      if (!data) {
        this.errorMsg = "some error";
        this.filteredMovies = [];
      } else {
        this.errorMsg = "";
        this.filteredMovies = data;
      }

      console.log(this.filteredMovies);
    });
  }
  onSearchTicker(val)
  {
    this.router.navigate (['/details', val]);
    // transfer control to details page
  }
}
