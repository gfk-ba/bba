import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from '../../components/modal/modal.component';
import { Document, IDocument } from '../../reducers/document/models/document.class';
import { Project } from '../../reducers/project/models/project.class';
import { fromHex, isHex, toHex } from '../../utils/hex';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'dcs-document-register',
  templateUrl: './document-register.component.html',
  styleUrls: ['./document-register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentRegisterComponent {
  @Input()
  public documents: Document[];
  @Input()
  public projects: Project[];
  @Input()
  public kindOptions: string[];

  @Output()
  registerDocument = new EventEmitter<IDocument>();

  @Output()
  doCreateProject = new EventEmitter<any>();

  @ViewChild('registerModal')
  public readonly registerModal: ModalComponent;

  public form: FormGroup;
  public hashIsHex = true;
  public confirmVisible = false;
  public errors: string[] = [];

  public newDocument: Document | null;

  private submitted = false;
  private errorMessages: { [key: string]: string } = {
    projectId: 'Please select a project.',
    kind: 'Please select the kind.',
    hash: 'Please enter the hash value.',
    description: 'Please enter a description.',
  };

  constructor(fb: FormBuilder, private cd: ChangeDetectorRef) {
    this.form = fb.group({
      projectId: [null, Validators.required],
      kind: [null, Validators.required],
      hash: ['', [Validators.required, Validators.maxLength(256)]],
      description: ['', Validators.required],
      linkIds: [[]],
    });
  }

  get displayErrors(): boolean {
    return this.submitted && this.form.invalid;
  }

  get hashToHexButtonText(): string {
    return this.hashIsHex ? 'Hex-decode' : 'Hex-encode';
  }

  public submitForm(event?: Event) {
    if (event) {
      event.preventDefault();
    }

    this.submitted = true;
    this.errors = [];

    if (this.form.valid) {
      const values = this.form.value;
      const project = this.projects.find(d => String(values.projectId) === String(d.id)).toObject();
      const links = this.documents
        .filter(d => values.linkIds.includes(d.id))
        .map(d => d.toObject());

      this.newDocument = new Document({
        ...values,
        links,
        project,
      });

      this.registerModal.show();
      this.confirmVisible = true;
      this.cd.markForCheck();
    } else {
      Object.keys(this.form.controls).forEach((key: string) => {
        if (this.form.controls[key].errors) {
          this.errors.push(this.errorMessages[key]);
        }
      });
    }
  }

  public createComponent(payment: any) {
    if (this.form.valid) {
      this.registerDocument.next({ ...this.form.value, payment });
      this.form.reset({ linkIds: [] });
      this.registerModal.hide();
    }
  }

  public validateHashIsHex(value: string) {
    this.hashIsHex = isHex(value);
  }

  public hash2hex(): void {
    this.hashIsHex ? this.convertHashToText() : this.convertHashToHex();
  }

  public convertHashToHex() {
    const hashControl = this.form.get('hash');
    let value: string = hashControl.value;

    if (!isHex(value)) {
      value = toHex(value);
      this.validateHashIsHex(value);
      hashControl.setValue(value);
    }
  }

  public convertHashToText() {
    const hashControl = this.form.get('hash');
    let value: string = hashControl.value;

    if (isHex(value)) {
      value = fromHex(value);
      this.validateHashIsHex(value);
      hashControl.setValue(value);
    }
  }

  public createProject(data: { name: string; description: string }) {
    this.doCreateProject.next(data);
  }
}
