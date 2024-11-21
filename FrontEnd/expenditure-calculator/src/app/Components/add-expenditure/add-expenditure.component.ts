import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-expenditure',
  templateUrl: './add-expenditure.component.html',
  styleUrl: './add-expenditure.component.css'
})
export class AddExpenditureComponent {

  expenseForm: FormGroup = new FormGroup({});
  categoryForm: FormGroup = new FormGroup({});
  categoryAdded = false;
  categories = ["Grocerries", "Car", "Mobile phones"];
  selectedCategories = ["Grocerries", "Car", "Mobile phones"];

  faTimes = faTimes

  constructor() { }

  ngOnInit(): void {
    this.expenseForm = new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required)
    });


  }

  addExpense() {
    console.log(this.expenseForm.value);
  }

  addCategoryAndAmount() {
    // const newCategory = this.categoryForm.get('newCategory').value;
    // const totalAmount = this.categoryForm.get('totalAmount').value;
    // this.categories.push(newCategory);
     this.categoryAdded = true;
  }

  addNewCategory() {
    // const newCategory = prompt('Enter new category:');
    // if (newCategory) {
    //   this.categories.push(newCategory);
    //   this.selectedCategories.push(newCategory);
    // }
  }

  removeCategory(category: string) {
    this.selectedCategories = this.selectedCategories.filter(c => c !== category);
  }
}

