import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../reducers/project/models/project.class';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';

export function uniqueProjectValidator(projects: Project[]) {
  return function(fc: AbstractControl): any {
    const names = projects.map(p => p.name);
    return names.includes(fc.value) ? { uniqueProjectValidator: true } : null;
  };
}

@Component({
  selector: 'dcs-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProjectComponent implements OnChanges {
  @Input()
  private projects: Project[];

  @Output()
  submitForm = new EventEmitter<{ name: string; description: string }>();

  @Output()
  cancel = new EventEmitter<any>();

  public form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.projects) {
      this.form
        .get('name')
        .setValidators([Validators.required, uniqueProjectValidator(this.projects)]);
    }
  }

  public submit(): void {
    if (this.form.valid) {
      this.submitForm.next(this.form.value);
    }
  }
}
