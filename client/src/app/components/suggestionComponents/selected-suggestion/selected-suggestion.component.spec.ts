import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedSuggestionComponent } from './selected-suggestion.component';

describe('SelectedSuggestionComponent', () => {
  let component: SelectedSuggestionComponent;
  let fixture: ComponentFixture<SelectedSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedSuggestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
