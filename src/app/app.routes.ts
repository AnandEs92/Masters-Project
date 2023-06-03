import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormComponent} from './components/form-component/form-component.component';
import {AppComponent} from './app.component';
import {QuestionsComponent} from './components/questions-component/questions-component.component';

const routes: Routes = [
  {
  path: '', component: FormComponent},
  {path: 'forms', component: FormComponent},
  {path: 'qstn', component: QuestionsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
