import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistdisplayComponent } from './watchlistdisplay.component';

describe('WatchlistdisplayComponent', () => {
  let component: WatchlistdisplayComponent;
  let fixture: ComponentFixture<WatchlistdisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchlistdisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchlistdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
