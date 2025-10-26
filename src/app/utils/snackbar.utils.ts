import { MatSnackBar } from '@angular/material/snack-bar';

export function showErrorSnackBar(snackBar: MatSnackBar, message: string): void {
  snackBar.open(message, '', {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'bottom',
    panelClass: ['error-snackbar'],
  });
}
