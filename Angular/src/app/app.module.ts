import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import {Routes, RouterModule} from '@angular/router';
import { HomePageComponentComponent } from './home-page-component/home-page-component.component'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import {StockService} from './StockService.service';
import { WatchlistdisplayComponent } from './watchlistdisplay/watchlistdisplay.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { PortfolioDisplayComponent } from './portfolio-display/portfolio-display.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { NewsComponent } from './news/news.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HighchartsChartModule } from 'highcharts-angular';
const appRoutes: Routes = [

{path: '', component: HomePageComponentComponent},
{path: 'details/:id', component: DetailsComponent},
{path: 'watchlist', component:  WatchlistdisplayComponent},
{path: 'portfolio', component:  PortfolioDisplayComponent},
{path: 'news', component:  NewsComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponentComponent,
    DetailsComponent,
    WatchlistdisplayComponent,
    WatchlistComponent,
    PortfolioDisplayComponent,
    PortfolioComponent,
    NewsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HighchartsChartModule
  ],
  providers: [StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
