import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Entry {
  date: string;
  id: string;
  name: string;
  winAmount: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  message: string = "Loading...";
  displayedColumns: string[] = ['date', 'id', 'name', 'winAmount'];
  entries: MatTableDataSource<Entry>;
  entryForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.entries = new MatTableDataSource<Entry>([]);
    this.entryForm = this.formBuilder.group({
      name: ['', Validators.required],
      id: ['', Validators.required],
      winAmount: ['', Validators.required],
      date: ['', Validators.required]
    });
  };

  ngOnInit(): void {
    this.authService.userLanding()
      .subscribe({
        next: (response: any) => {
          this.message = response;
          // Fetch initial entries here
          this.refreshEntries();
        },
        error: (error: any) => {
          this.message = "Error";
          this.router.navigate(['/']);
        }
      });
  }

  refreshEntries(): void {
    // Replace this with a call to the backend to fetch the user's entries
    // For now, it will create 10 dummy entries
    const dummyEntries: Entry[] = [];
    for (let i = 0; i < 10; i++) {
      dummyEntries.push({ date: '2023-04-18', id: 'ID' + i, name: 'Scratchoff ' + i, winAmount: i * 10 });
    }
    this.entries.data = dummyEntries;
  }

  onSubmit(): void {
    const newEntry: Entry = {
      date: this.entryForm.get('date')?.value,
      id: this.entryForm.get('id')?.value,
      name: this.entryForm.get('name')?.value,
      winAmount: this.entryForm.get('winAmount')?.value,
    };
    
    // Send the newEntry data to the backend to save it in the user's data
    // After sending the data to the backend, you can clear the form and refresh the entries
    this.clearForm();
    this.refreshEntries();
  }

  clearForm(): void {
  this.entryForm.reset();
  }
  }