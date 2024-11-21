import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  faTimes } from '@fortawesome/free-solid-svg-icons';
import { ExpenseService } from '../../Service/expense.service';

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

  constructor(private expense: ExpenseService) { }

  ngOnInit(): void {
    this.expenseForm = new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required)
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

  addNewCategory() {
    // const newCategory = prompt('Enter new category:');
    // if (newCategory) {
    //   this.categories.push(newCategory);
    //   this.selectedCategories.push(newCategory);
    // }
  }

  removeCategory(id : string) {
     this.expense.deleteCategory(id).subscribe(res => {
        this.ngOnInit()
     })
  }
}

