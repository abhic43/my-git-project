import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputFormComponent } from './components/input-form/input-form/input-form.component';
import { DisplayDataComponent } from './components/display-data/display-data/display-data.component';


const routes: Routes = [
  {
    path: '',
    component: InputFormComponent },
  {
    path: 'user/:uid',
    component: DisplayDataComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
