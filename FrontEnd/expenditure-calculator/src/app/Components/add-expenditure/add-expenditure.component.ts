import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  faTimes } from '@fortawesome/free-solid-svg-icons';
import { ExpenseService } from '../../Service/expense.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-expenditure',
  templateUrl: './add-expenditure.component.html',
  styleUrl: './add-expenditure.component.css'
})
export class AddExpenditureComponent {

  expenseForm: FormGroup = new FormGroup({});
  categoryForm: FormGroup = new FormGroup({});
  categoryAdded = false;
  categories: any[] = [];
  selectedCategories: any[] = [];
  error:string = ''

  faTimes = faTimes

  constructor(private expense: ExpenseService, private router:Router) { }

  ngOnInit(): void {
    this.expenseForm = new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      categories: new FormControl('', Validators.required)
    });

    this.categoryForm = new FormGroup({
      category: new FormControl('', Validators.required),
     
    });

    this.expense.getAllCategory().subscribe(res => {
        this.selectedCategories = res 
        this.categories = res
    })

  }

  addExpense() {
    console.log(this.expenseForm.value);
    this.expense.addNewCategoryAndPrice(this.expenseForm.value).subscribe(res => {
      if(res){
        this.router.navigate(['/home/dashboard'])  
      }
    })
  }

  addCategoryAndAmount() {
    console.log(this.categoryForm)
    if(this.categoryForm.valid){
      this.expense.addNewCategoryAndPrice(this.categoryForm.value).subscribe(res => {
        if(res){
          this.categoryAdded = true;
          this.ngOnInit()
        }
      }, (error) => this.error = "Something went wrong!")
    }
  }

  removeCategory(id : string) {
     this.expense.deleteCategory(id).subscribe(res => {
        this.ngOnInit()
     })
  }
}

