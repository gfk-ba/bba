import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AddProjectComponent } from './add-project.component';
import { configureComponentTestSuite } from '../../../testing';
import { Project } from '../../reducers/project/models/project.class';

@Component({
  selector: 'dcs-test-component',
  template: `
    <dcs-add-project
      [projects]="projects"
      (submitForm)="collectSubmit($event)"
    ></dcs-add-project>`,
})
class TestHostComponent {
  @ViewChild(AddProjectComponent)
  public subject: AddProjectComponent;

  public projects: Project[] = [];
  public submitData: any;

  public collectSubmit(data: any) {
    this.submitData = data;
  }
}

describe('AddProjectComponent', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let subject: AddProjectComponent;
  let subjectEl: HTMLUnknownElement;

  configureComponentTestSuite();

  beforeAll(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent, AddProjectComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    subject = testHost.subject;
    subjectEl = fixture.nativeElement.querySelector('dcs-add-project');
    fixture.detectChanges();
  });

  it('should create testHost', () => {
    expect(testHost).toBeTruthy();
  });

  it('should render component', () => {
    expect(subjectEl).toBeInstanceOf(HTMLUnknownElement);
    expect(subject).toBeInstanceOf(AddProjectComponent);
  });

  describe('form', () => {
    it('creates the form', () => {
      expect(subject.form).toBeInstanceOf(FormGroup);
      expect(subject.form.value).toMatchSnapshot();
    });

    it('validates', () => {
      expect(subject.form.valid).toBeFalsy();
      subject.form.setValue({ name: 'testname', description: 'testdescription' });
      expect(subject.form.valid).toBeTruthy();
    });

    it('adds the uniqueProjectValidator', () => {
      testHost.projects = [new Project({ name: 'Project 1' }), new Project({ name: 'Project 2' })];
      fixture.detectChanges();

      subject.form.setValue({ name: 'Project 1', description: 'foo' });
      expect(subject.form.valid).toBeFalsy();

      subject.form.setValue({ name: 'Project 2', description: 'foo' });
      expect(subject.form.valid).toBeFalsy();

      subject.form.setValue({ name: 'Project 3', description: 'foo' });
      expect(subject.form.valid).toBeTruthy();
    });
  });

  describe('submitting the form', () => {
    describe('if invalid', () => {
      it('does not call the submitForm EventEmitter', () => {
        subject.form.setValue({ name: '', description: '' });
        subject.submit();

        expect(testHost.submitData).toBeUndefined();
      });
    });

    describe('if valid', () => {
      it('calls the submitForm EventEmitter', () => {
        subject.form.setValue({ name: 'testname', description: 'testdescription' });
        subject.submit();

        expect(testHost.submitData).toMatchSnapshot();
      });
    });
  });
});
