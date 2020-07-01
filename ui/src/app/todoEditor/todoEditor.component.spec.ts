/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TodoEditorComponent } from './todoEditor.component';

describe('TodoEditorComponent', () => {
  let component: TodoEditorComponent;
  let fixture: ComponentFixture<TodoEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoEditorComponent ]
    })
    .compileComponents();+
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
