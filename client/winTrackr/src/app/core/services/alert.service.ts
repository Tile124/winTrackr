import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private snackBarConfig: MatSnackBarConfig = {
    duration: 10000, // Display for 3 seconds
    verticalPosition: 'top', // Show at the top of the screen
    panelClass: 'red-snackbar' // Apply red background color
  };

  constructor(private snackBar: MatSnackBar) { }

  showAlert(message: string): void {
    this.snackBar.open(message, 'X', this.snackBarConfig);
  }
}

