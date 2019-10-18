import { Component, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DocumentRegisterComponent } from './document-register.component';
import { configureComponentTestSuite } from '../../../testing';
import { Document } from '../../reducers/document/models/document.class';
import { Project } from '../../reducers/project/models/project.class';

@Component({
  selector: 'dcs-test-component',
  template: `
    <dcs-document-register
      [documents]="documents"
      [projects]="projects"
    ></dcs-document-register>`,
})
class TestHostComponent {
  @ViewChild(DocumentRegisterComponent)
  public subject: DocumentRegisterComponent;

  public projects: Project[] = [new Project({ id: '42', name: 'Project 1' })];
  public documents: Document[] = [
    new Document({
      id: '1',
      projectId: 1,
      description: 'Component 1 of Project 1',
      kind: 'data',
      hash: '12345',
      address: '0xa3fb33a771b2e8863d27b155384b46b114455c92e7e199ba57b1be71568f06e8',
      linkIds: [],
      state: 'ok',
      stateDetails: '',
      createdAt: '2018-08-20T14:28:43.863Z',
    }),
    new Document({
      id: '2',
      projectId: 1,
      description: 'Component 2 of Project 1',
      kind: 'model',
      hash: '12345',
      address: '0xa3fb33a771b2e8863d27b155384b46b114455c92e7e199ba57b1be71568f06e8',
      linkIds: [],
      state: 'ok',
      stateDetails: '',
      createdAt: '2018-08-20T14:28:43.863Z',
    }),
    new Document({
      id: '3',
      projectId: 1,
      description: 'Component 3 of Project 1',
      kind: 'result',
      hash: '12345',
      address: '0xa3fb33a771b2e8863d27b155384b46b114455c92e7e199ba57b1be71568f06e8',
      linkIds: [1, 2],
      state: 'ok',
      stateDetails: '',
      createdAt: '2018-08-20T14:28:43.863Z',
    }),
  ];
}

describe('DocumentRegisterComponent', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let subject: DocumentRegisterComponent;
  let subjectEl: HTMLUnknownElement;

  configureComponentTestSuite();

  beforeAll(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent, DocumentRegisterComponent],
      imports: [ReactiveFormsModule, NgSelectModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    subject = testHost.subject;
    subjectEl = fixture.nativeElement.querySelector('dcs-document-register');
    fixture.detectChanges();
  });

  it('should create testHost', () => {
    expect(testHost).toBeTruthy();
  });

  it('should render component', () => {
    expect(subjectEl).toBeInstanceOf(HTMLUnknownElement);
    expect(subject).toBeInstanceOf(DocumentRegisterComponent);
  });

  describe('submitForm', () => {
    let registerModalShowSpy: jest.Mock;

    const formData = {
      projectId: '42',
      kind: 'custom',
      hash: '12345',
      description: 'Desc',
      linkIds: [1, 2, 3],
    };

    beforeEach(() => {
      subject.registerModal.show = () => {};
      registerModalShowSpy = jest.spyOn(subject.registerModal, 'show').mockImplementation(() => {});
      subject.form.setValue(formData);

      subject.submitForm(new CustomEvent('submit'));
    });

    it('shows the confirm modal', () => {
      expect(registerModalShowSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('createComponent', () => {
    let resetSpy: jest.SpyInstance;
    let registerDocumentSpy: jest.SpyInstance;
    let registerModalHideSpy: jest.Mock;

    const formData = {
      projectId: '42',
      kind: 'custom',
      hash: '12345',
      description: 'Desc',
      linkIds: [1, 2, 3],
    };

    beforeEach(() => {
      resetSpy = jest.spyOn(subject.form, 'reset');
      registerDocumentSpy = jest.spyOn(subject.registerDocument, 'next');
      subject.registerModal.hide = () => {};
      registerModalHideSpy = jest.spyOn(subject.registerModal, 'hide').mockImplementation(() => {});

      subject.form.setValue(formData);
      subject.createComponent({ coupon: 'test' });
    });

    it('resets the form', () => {
      expect(resetSpy).toHaveBeenCalledTimes(1);
      expect(resetSpy).toHaveBeenCalledWith({ linkIds: [] });
      expect(subject.form.value).toMatchSnapshot();
    });

    it('fires the EventEmitter', () => {
      expect(registerDocumentSpy).toHaveBeenCalledWith({
        ...formData,
        payment: { coupon: 'test' },
      });
    });

    it('closes the modal', () => {
      expect(registerModalHideSpy).toHaveBeenCalledTimes(1);
    });
  });
});
