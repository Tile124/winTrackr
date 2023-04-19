import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScratchoffComponent } from './scratchoff/scratchoff.component';
import { ScratchOffEntryService } from 'app/core/services/scratch-off-entry.service';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CoreModule } from 'app/core/core.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MyMaterialModule } from '../material.module';
import { MatOptionModule } from '@angular/material/core';




@NgModule({
  declarations: [
    DashboardComponent,
    ScratchoffComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    HttpClientModule,
    RouterModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MyMaterialModule,
    MatOptionModule,
      
  ],
  providers: [
    ScratchOffEntryService,
  ]
})
export class PrivateModule { }
