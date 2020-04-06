import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageVacationsComponent } from './page-vacations.component';

describe('PageVacationsComponent', () => {
  let component: PageVacationsComponent;
  let fixture: ComponentFixture<PageVacationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageVacationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageVacationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
