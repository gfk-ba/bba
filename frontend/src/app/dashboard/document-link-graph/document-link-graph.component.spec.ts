import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentLinkGraphComponent } from './document-link-graph.component';

describe('DocumentLinkGraphComponent', () => {
  let component: DocumentLinkGraphComponent;
  let fixture: ComponentFixture<DocumentLinkGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentLinkGraphComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentLinkGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
