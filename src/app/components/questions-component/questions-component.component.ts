import { Component, OnInit } from '@angular/core';
import {PostService} from '../../services/post.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Dropdown} from 'primeng/primeng';
import {$} from 'protractor';

@Component({
  selector: 'app-questions-component',
  templateUrl: './questions-component.component.html',
  styleUrls: ['./questions-component.component.css']
})
export class QuestionsComponent implements OnInit {
  public questions: any;
  public resultVisible: any = false;
  public healthAndSafeScore = 0;
  public easyToUseScore = 0;
  public secureDataScore = 0;
  public robustBuildScore = 0;
  public newDocumentForm: FormGroup;
  public selectedValue: String;
  public today;
  uploadedFiles: any[] = [];
  public isAndroid= false;
  public isApple= false;
  public isWeb= false;
  public selectedDropdown;
  public healthAndSafeLabel = 'E';
  public easyToUseLabel = 'E';
  public secureDataLabel = 'E';
  public robustBuildLabel = 'E';
  public overallscore= 0;
  public overalllabel= 'E';
  public selectedOS;
  public selectedLang;
  public appName;
  public manufacturer;
  public url;
  constructor(private ps: PostService, private fb: FormBuilder) {
    this.newDocumentForm = fb.group({

    });
  }

  ngOnInit() {
    this.ps.getQuestionsData().subscribe(data => {
      console.log(data);
      this.questions = JSON.parse(data);
      this.questions.map(d => {
        if (d.required) {
          this.newDocumentForm.addControl(d.id, new FormControl(null, Validators.required));
        }
        else {
          this.newDocumentForm.addControl(d.id, new FormControl(null, Validators.maxLength(200)));
        }

        //d.select = d.type + d.id;

      });

    });

  }

  changeDropdownValue(dd: Dropdown, detail) {
    const val = dd.selectedOption.label;
    console.log(val);
    this.newDocumentForm.get(detail.id).setValue(val);
    //this.newDocumentForm.controls[detail.id].setValue(val, {onlySelf: true});
    this.newDocumentForm.patchValue({label: val});

  }
  patchValue(value){
    this.newDocumentForm.patchValue({
        label : value
    });
   // this.newDocumentForm.get('department').updateValueAndValidity();
    console.log(this.newDocumentForm.value);
}


  checkResult() {
    this.resultVisible = true;
    this.healthAndSafeScore = 0;
    this.easyToUseScore = 0;
   this.secureDataScore = 0;
    this.robustBuildScore = 0;
    if (document.querySelector('.background-img')) {
      document.querySelector('.background-img').classList.remove('background-img');
    }
    // this.questions.map((d, index) => {
    //  console.log(document.getElementById(d.select));
    // });
    for (const control of Object.keys(this.newDocumentForm.controls)) {
      console.log([this.newDocumentForm.get(control).value]);
    }
    this.showTodaysDate();
    this.questions.map((d, i) => {
      if (d.type === 'dropdown' && d.required){
        if (d.scoreType === 'Healthy and safe'){
          if (this.newDocumentForm.get(d.id).value === 'YES' && d.weight !== ''){
            this.healthAndSafeScore = this.healthAndSafeScore + d.weight;
            console.log(d.scoreType);
          }
        } else if (d.scoreType === 'Easy to use'){
          if (this.newDocumentForm.get(d.id).value === 'YES' && d.weight !== ''){
            this.easyToUseScore = this.easyToUseScore + d.weight;
          }
        }
        else if (d.scoreType === 'Secure data'){
          if (this.newDocumentForm.get(d.id).value === 'YES' && d.weight !== ''){
           this.secureDataScore = this.secureDataScore + d.weight;
          }
        }
        else if (d.scoreType === 'Robust build'){
          if (this.newDocumentForm.get(d.id).value === 'YES' && d.weight !== ''){
            this.robustBuildScore = this.robustBuildScore + d.weight;
          }
        }
      }
    });
     console.log(this.healthAndSafeScore);
     console.log(this.easyToUseScore);
     console.log(this.secureDataScore);
     console.log(this.robustBuildScore);
    // this.newDocumentForm.map(d=>{
    //   console.log(this.newDocumentForm);
    // })
    this.setValueForEvaluationH();
    this.setValueForEvaluationE();
    this.setValueForEvaluationS();
    this.setValueForEvaluationB();
    this.overallscore = this.healthAndSafeScore * 5 + this.easyToUseScore * 1.5 + this.secureDataScore * 2.5 + this.robustBuildScore;
    this.setValueForOverallScore();
    this.checkOSSupport();
    this.appName = this.newDocumentForm.get('2').value ;
    this.manufacturer = this.newDocumentForm.get('6').value ;
     //setTimeout(this.setImage, 3000);




  }
  setImage(){
    const src = URL.createObjectURL(this.uploadedFiles);
    const preview = <HTMLImageElement>document.getElementById('preview');
    preview.src = src;
    preview.style.display = 'block';
  }
  checkOSSupport(){
    console.log(this.selectedOS);
    if (this.selectedOS) {
      if (this.selectedOS.includes('iOS')) {
        this.isApple = true;
      }
      if (this.selectedOS.includes('Android')) {
        this.isAndroid = true;
      }
      if (this.selectedOS.includes('Web')) {
        this.isWeb = true;
      }
    }
  }
  setValueForOverallScore(){
    if ((this.overallscore >= 279 && this.overallscore <= 309) || (this.overallscore > 309)){
      this.overalllabel = 'A';
    }
    else if (this.overallscore >= 248 && this.overallscore <= 278 ){
      this.overalllabel = 'B';
    }
    else if (this.overallscore >= 217 && this.overallscore <= 247 ){
      this.overalllabel = 'C';
    }
    else if (this.overallscore >= 186 && this.overallscore <= 216 ){
      this.overalllabel = 'D';
    }
    else if (this.overallscore >= 0 && this.overallscore <= 185 ){
      this.overalllabel = 'E';
    }
  }
  setValueForEvaluationH(){
    if ((this.healthAndSafeScore >= 30 && this.healthAndSafeScore <= 33) || (this.healthAndSafeScore > 33)){
      this.healthAndSafeLabel = 'A';
    }
    else if (this.healthAndSafeScore >= 27 && this.healthAndSafeScore <= 29 ){
      this.healthAndSafeLabel = 'B';
    }
    else if (this.healthAndSafeScore >= 24 && this.healthAndSafeScore <= 26 ){
      this.healthAndSafeLabel = 'C';
    }
    else if (this.healthAndSafeScore >= 20 && this.healthAndSafeScore <= 23 ){
      this.healthAndSafeLabel = 'D';
    }
    else if (this.healthAndSafeScore >= 0 && this.healthAndSafeScore <= 19 ){
      this.healthAndSafeLabel = 'E';
    }
  }
  setValueForEvaluationE(){
   if (this.easyToUseScore >= 23 && this.easyToUseScore <= 25 ){
      this.easyToUseLabel = 'A';
    }
    else if (this.easyToUseScore >= 20 && this.easyToUseScore <= 22 ){
      this.easyToUseLabel = 'B';
    }
    else if (this.easyToUseScore >= 18 && this.easyToUseScore <= 19 ){
      this.easyToUseLabel = 'C';
    }
    else if (this.easyToUseScore >= 15 && this.easyToUseScore <= 17 ){
      this.easyToUseLabel = 'D';
    }
    else if (this.easyToUseScore >= 0 && this.easyToUseScore <= 14 ){
      this.easyToUseLabel = 'E';
    }
  }
  setValueForEvaluationS(){
     if (this.secureDataScore >= 32 && this.secureDataScore <= 35 ){
      this.secureDataLabel = 'A';
    }
    else if (this.secureDataScore >= 28 && this.secureDataScore <= 31 ){
      this.secureDataLabel = 'B';
    }
    else if (this.secureDataScore >= 25 && this.secureDataScore <= 27 ){
      this.secureDataLabel = 'C';
    }
    else if (this.secureDataScore >= 21 && this.secureDataScore <= 24 ){
      this.secureDataLabel = 'D';
    }
    else if (this.secureDataScore >= 0 && this.secureDataScore <= 20 ){
      this.secureDataLabel = 'E';
    }
  }
  setValueForEvaluationB(){
     if (this.robustBuildScore >= 18 && this.robustBuildScore <= 19 ){
      this.robustBuildLabel = 'A';
    }
    else if (this.robustBuildScore >= 16 && this.robustBuildScore <= 17 ){
      this.robustBuildLabel = 'B';
    }
    else if (this.robustBuildScore >= 14 && this.robustBuildScore <= 15 ){
      this.robustBuildLabel = 'C';
    }
    else if (this.robustBuildScore >= 12 && this.robustBuildScore <= 13 ){
      this.robustBuildLabel = 'D';
    }
    else if (this.robustBuildScore >= 0 && this.robustBuildScore <= 11 ){
      this.robustBuildLabel = 'E';
    }
  }

  showTodaysDate() {
    this.today = new Date();
    const dd = String(this.today.getDate()).padStart(2, '0');
    const mm = String(this.today.getMonth() + 1).padStart(2, '0');
    const yyyy = this.today.getFullYear();
    this.today = mm + '/' + dd + '/' + yyyy;
  }

  previewImage(event) {
    this.uploadedFiles = event.target.files[0];
    // this.url = URL.createObjectURL(this.uploadedFiles);


  }
  // readURL(input) {
  //           if (input.files && input.files[0]) {
  //               var reader = new FileReader();
  //
  //               reader.onload = function (e) {
  //                   $('#blah')
  //                       .attr('src', event.target["result"]);
  //               };
  //
  //               reader.readAsDataURL(input.files[0]);
  //           }
  //       }


}
