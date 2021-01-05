import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCookiesComponent } from './private-cookies.component';

describe('PrivateCookiesComponent', () => {
  let component: PrivateCookiesComponent;
  let fixture: ComponentFixture<PrivateCookiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateCookiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateCookiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
