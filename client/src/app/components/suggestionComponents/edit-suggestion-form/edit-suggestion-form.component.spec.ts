import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSuggestionFormComponent } from './edit-suggestion-form.component';

describe('EditSuggestionFormComponent', () => {
  let component: EditSuggestionFormComponent;
  let fixture: ComponentFixture<EditSuggestionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSuggestionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSuggestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
