import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicStatisticsComponent } from './public-statistics.component';

describe('PublicStatisticsComponent', () => {
  let component: PublicStatisticsComponent;
  let fixture: ComponentFixture<PublicStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
