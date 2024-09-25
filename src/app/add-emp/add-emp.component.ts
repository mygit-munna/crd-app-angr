import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee-.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InjectionToken } from '@angular/core';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})
export class AddEmpComponent implements OnInit {
  empForm: FormGroup
  education: string[] = [
    'Matric',
    'Intermediate',
    'Graduation',
    'Post Graduation'
  ]

  constructor(private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<AddEmpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,private _coreService:CoreService
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      comapny: '',
      experience: '',
      package: ''
    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }

  onFormSubmit(data: any) {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService.updateEmpDetails(this.data.id,this.empForm.value).subscribe(({
          next: (data: any) => {
            // alert("Employee detail updated successfully")
            this._coreService.openSnackBar('Employee detail updated successfully','Done')
            // this._empService.getAllEmployeeList()
            this._dialogRef.close(true)
          },
          error: (err: any) => {
            console.error(err);
          }
        }))
      } else {
        this._empService.addEmployee(data.value).subscribe(({
          next: (data: any) => {
            // alert("Employee added successfully")
            this._coreService.openSnackBar('Employee added successfully','Done')
            // this._empService.getAllEmployeeList()
            this._dialogRef.close(true)
          },
          error: (err: any) => {
            console.error(err);
          }
        }))
      }
    }

  }
}
