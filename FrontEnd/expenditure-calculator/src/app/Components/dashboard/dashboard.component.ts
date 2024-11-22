import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { read, utils, writeFile } from 'xlsx';
import { ExpenseService } from '../../Service/expense.service';
import { AddNewExpenseInterface } from '../../interface/LoginInterface';

Chart.register(...registerables)

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  chart:any
  pie:any

  pieChartData :any = {}

  constructor(private expenseService : ExpenseService){}
  
  dataset:any = []

  ngOnInit(): void {
    this.chart = new Chart('myChart', this.config);
    this.pie = new Chart('myPie', this.configPie)
    
    this.expenseService.getSummary().subscribe(res => {
      this.expenditures = res.tableDetails
      this.dataset.push(...res.tableData)
      this.pieChartData = res.pieDetails
      this.dataset.push()
    })
  }
  
  
  expenditures: AddNewExpenseInterface[] = [];


  public config:any ={
    type: 'bar',
    data: {
      labels: ['JAN', "FEB", "MAR", 'APR', 'MAY', "JUN", 'JUL', "AUG", 'SEP', "NOV", "DEC"],
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
      "labels": [
        "Grocery1",
        "Grocery33",
        "jk"
    ],
      datasets: [ {
        "label": "Grocery1",
        "data": [
            25
        ]
    }, {
      "label": "Grocery33",
      "data": [
          50
      ]
  },
  {
      "label": "jk",
      "data": [
          25
      ]
  }]
    },
  };

 

  exportData() {
    const headings = [["Id", 'Name', 'Amount', 'Date', "Category"]]
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
