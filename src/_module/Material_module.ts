import { NgModule } from "@angular/core";
import { MatCardModule} from  '@angular/material/card';
import {MatTableModule}from  '@angular/material/table';
import {MatButtonModule}from  '@angular/material/button';
import {MatFormFieldModule}from  '@angular/material/form-field';
import { MatInputModule}from  '@angular/material/input';
import { MatPaginatorModule}from  '@angular/material/paginator';
import { MatSortModule}from  '@angular/material/sort';
import { MatMenuModule}from  '@angular/material/menu';
import { MatToolbarModule}from  '@angular/material/toolbar';
import { MatIconModule}from  '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({

    exports:[
        MatCardModule,MatTableModule,MatButtonModule,MatFormFieldModule,MatInputModule,MatPaginatorModule,MatSortModule,MatMenuModule,MatToolbarModule,MatIconModule,MatSidenavModule,MatDialogModule 
    ]
})

export class MaterialModule{}