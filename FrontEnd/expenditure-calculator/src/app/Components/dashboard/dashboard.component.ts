import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { read, utils, writeFile } from 'xlsx';
import { ExpenseService } from '../../Service/expense.service';

Chart.register(...registerables)

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  chart:any
  pie:any

  constructor(private expenseService : ExpenseService){}

  ngOnInit(): void {
    this.chart = new Chart('myChart', this.config);
    this.pie = new Chart('myPie', this.configPie)
  }

  expenditures = [
    { name: 'Test Expense', amount: 100, category: 'Food', date: new Date('2022-07-22') },
    { name: 'Another Expense', amount: 200, category: 'Travel', date: new Date('2022-07-25') },
    // Add more data here
  ];
 

  dataset = [{
    label: 'Food',
    data: [650, 59, 80, 81, 56, 55, 400],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  },
  {
    label: 'Travel',
    data: [650, 59, 80, 81, 56, 55, 400],
    backgroundColor: [
      'rgba(0, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    
    borderColor: [
      'rgb(0, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]

  public config:any ={
    type: 'bar',
    data: {
      labels: ['JAN', "FEB", "MAR", 'APR', 'MAY', "JUN", 'JUL'],
      datasets: this.dataset
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };

  public configPie :any = {
    type: 'pie',
    data: {
      labels: [
        'Red',
        'Blue',
        'Yellow'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    },
  };

 

  exportData() {
    console.log(this.expenditures);
    const headings = [[ 'Name', 'Amount', 'Category', "Date"]]
    const workBook = utils.book_new()
    const workSheet = utils.json_to_sheet([])
    utils.sheet_add_aoa(workSheet, headings)
    utils.sheet_add_json(workSheet, this.expenditures, {
      origin: "A2",
      skipHeader: true
    });
    utils.book_append_sheet(workBook, workSheet, 'Expenditure');
    writeFile(workBook, 'Expenditure Report.xlsx')
  }
}
