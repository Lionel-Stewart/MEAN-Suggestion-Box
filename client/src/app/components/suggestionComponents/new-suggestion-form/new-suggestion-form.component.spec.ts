import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSuggestionFormComponent } from './new-suggestion-form.component';

describe('NewSuggestionFormComponent', () => {
  let component: NewSuggestionFormComponent;
  let fixture: ComponentFixture<NewSuggestionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSuggestionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSuggestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
