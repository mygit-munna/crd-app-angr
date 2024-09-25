import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AddEmpComponent } from './add-emp/add-emp.component'
import { EmployeeService } from './services/employee-.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CoreService } from './core/core.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'dob', 'gender', 'education', 'comapny', 'experience', 'package', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @inject(MAT_DIALOG_DATA) private data:any

  constructor(private _dialog: MatDialog, private _empService: EmployeeService, private _coreService:CoreService ) { }
  ngOnInit(): void {
    this.getAllEmpData()
    
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(AddEmpComponent);
    dialogRef.afterClosed().subscribe(({
      next: (val) => { 
        this.getAllEmpData()
      }
    }))

  }

  getAllEmpData() {
    this._empService.getAllEmployeeList().subscribe(({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },
      error: (err) => {
        console.log(err)
      }
    }))
  }


  deleteEmployeeById(id: number) {
    this._empService.deleteEmployee(id).subscribe(({
      next: (res) => {
        // alert("employee deleted")
        // alert("Are you sure you want to delete")
        this._coreService.openSnackBar('employee deleted','Done')
        this.getAllEmpData()
      },
      error: console.log,
    }))
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  openEditEmpForm(data:any   ) {
    const dialogRef = this._dialog.open(AddEmpComponent,{
      data,
    });


    dialogRef.afterClosed().subscribe(({
      next: (val) => {
        this.getAllEmpData()
      }
    }))

   

  }


}
