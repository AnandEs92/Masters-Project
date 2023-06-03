import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PostService} from './services/post.service';
import { HttpClientModule } from '@angular/common/http';
import {AppRoutingModule} from './app.routes';
import {AutoCompleteModule, ButtonModule, DropdownModule, FileUploadModule, MultiSelectModule} from 'primeng/primeng';
import {DataTableModule, SharedModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import { FormComponent } from './components/form-component/form-component.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { QuestionsComponent } from './components/questions-component/questions-component.component';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    QuestionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule, AppRoutingModule, AutoCompleteModule, DataTableModule, GrowlModule, DropdownModule, FileUploadModule, ButtonModule, ReactiveFormsModule, MultiSelectModule

  ],
  providers: [PostService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
