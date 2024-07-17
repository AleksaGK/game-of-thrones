import { Component, inject, model } from '@angular/core';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { DbService } from '../../services/db.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-add-character-dialog',
  templateUrl: './add-character-dialog.component.html',
  styleUrls: ['./add-character-dialog.component.scss'],
  imports: [MatFormField, MatSelect, MatOption, MatLabel, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule]
})
export class AddCharacterDialogComponent {
  private formBuilder = inject(FormBuilder);
  readonly dialogRef = inject(MatDialogRef<AddCharacterDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly dbService = inject(DbService);

  form = this.formBuilder.group({
    id: [this.data.character?.id || this.dbService.getLastId()],
    firstName: [this.data.character?.firstName],
    lastName: [this.data.character?.lastName, Validators.required],
    title: [this.data.character?.title],
    family: [this.data.character?.family, Validators.required],
    imageUrl: [this.data.character?.imageUrl] 
  });

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close({...this.form.value, 'fullName': this.form.value.firstName + " " + this.form.value.lastName});
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
