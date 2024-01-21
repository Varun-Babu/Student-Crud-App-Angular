import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-stu-add-edit-component',
  templateUrl: './stu-add-edit-component.component.html',
  styleUrls: ['./stu-add-edit-component.component.css'],
})
export class StuAddEditComponentComponent implements OnInit {
  stuForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private api: StudentService,
    private _dialogRef: MatDialogRef<StuAddEditComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.stuForm = this._fb.group({
      name: '',
      age: '',
    });
  }
  ngOnInit(): void {
    this.stuForm.patchValue(this.data);
  }

  onSubmit() {
    console.log(this.stuForm);
    if(this.data){
      this.api.editStudent(this.data.id,this.stuForm.value).subscribe({
        next: (val: any) => {
          alert('student updated successfully');
          location.reload();
        },
        error: (err: any) => {
          alert('oops something went wrong!!');
          console.log(err);
        },
      });
    }
    else{
      this.api.addStudent(this.stuForm.value).subscribe({
        next: (val: any) => {
          alert('student added successfully');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          alert('oops something went wrong!!');
          console.log(err);
        },
      });
    }

  }
}
