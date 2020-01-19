import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewPartyComponent } from './create-new-party.component';

describe('CreateNewPartyComponent', () => {
  let component: CreateNewPartyComponent;
  let fixture: ComponentFixture<CreateNewPartyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewPartyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
