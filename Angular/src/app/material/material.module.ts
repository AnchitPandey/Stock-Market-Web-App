import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'

//import {MatFormField} from '@angular/material/form-field';

const material = [
  MatButtonModule,
  MatButtonToggleModule,
MatButtonToggleModule,
MatIconModule,
MatBadgeModule,
MatProgressSpinnerModule,
MatToolbarModule,
MatSidenavModule,
MatListModule,
MatGridListModule,
MatCardModule,
MatTabsModule,
MatAutocompleteModule,
MatFormFieldModule,
MatInputModule
];

@NgModule({

  imports: [material],
  exports:[material]
})
export class MaterialModule { }
