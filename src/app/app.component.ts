import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StuAddEditComponentComponent } from './stu-add-edit-component/stu-add-edit-component.component';
import { StudentService } from './services/student.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Student } from './models/student';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'age', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _dialog : MatDialog, private api: StudentService){

  }
  ngOnInit(): void {
    this.getStudentList();
  }

  openAddEditForm(){
    const dialogRef = this._dialog.open(StuAddEditComponentComponent);
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getStudentList();
        }
      },
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getStudentList(){
      this.api.getStudentList().subscribe({
        next:(res:any)=>{
          console.log(res)
          this.dataSource = res;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error:(err:any)=>{ 
        }
      })
  }

  deleteStudent(id:number){
    this.api.deleteStudent(id).subscribe({
      next:(res)=>{
        alert("student deleted successfully");
        this.getStudentList();
      },
      error:(err:any)=>{
      }

    })  }

    editStudent(data:any){
      this._dialog.open(StuAddEditComponentComponent,{data,})
    }


}
