import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScratchOffDataComponent } from './scratch-off-data.component';

describe('ScratchOffDataComponent', () => {
  let component: ScratchOffDataComponent;
  let fixture: ComponentFixture<ScratchOffDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScratchOffDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScratchOffDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
