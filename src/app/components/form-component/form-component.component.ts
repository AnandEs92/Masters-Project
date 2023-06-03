import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css']
})
export class FormComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    console.log("forms comp");
  }
   navigateFormsComponent(){
    this.router.navigateByUrl('qstn');
    console.log("asfsdf");
  }

}
