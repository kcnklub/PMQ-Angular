import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinExistingPartyComponent } from './join-existing-party.component';

describe('JoinExistingPartyComponent', () => {
  let component: JoinExistingPartyComponent;
  let fixture: ComponentFixture<JoinExistingPartyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinExistingPartyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinExistingPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
