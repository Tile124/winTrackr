import { NgModule } from  '@angular/core';
import { MatButtonModule} from '@angular/material/button';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule} from '@angular/material/datepicker';

import { MatIconModule} from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule} from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatRadioModule} from '@angular/material/radio';
import { MatListModule} from '@angular/material/list';
import { FormsModule} from '@angular/forms'
import { MatSelectModule } from '@angular/material/select';

const materialComponents = [
    MatButtonModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatListModule,
    FormsModule,
    MatSelectModule
    ];

@NgModule({
imports: [materialComponents],
exports: [materialComponents],

})

export  class  MyMaterialModule { }