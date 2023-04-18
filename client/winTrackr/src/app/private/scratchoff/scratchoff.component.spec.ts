import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScratchoffComponent } from './scratchoff.component';

describe('ScratchoffComponent', () => {
  let component: ScratchoffComponent;
  let fixture: ComponentFixture<ScratchoffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScratchoffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScratchoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
