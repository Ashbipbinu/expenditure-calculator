import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  expenditures = [
    { name: 'Test Expense', amount: 100, category: 'Food', date: new Date('2022-07-22') },
    { name: 'Another Expense', amount: 200, category: 'Travel', date: new Date('2022-07-25') },
    // Add more data here
  ];

  exportData() {
    // Implement export logic here (e.g., CSV, Excel, PDF)
    // For demonstration purposes, we'll just log the data to the console
    console.log(this.expenditures);
  }
}
