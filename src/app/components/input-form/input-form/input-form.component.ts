
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

 


@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {

  registered:boolean=false;
  submitted:boolean=false;
  userForm:FormGroup;
  guid: string;
	serviceErrors:any = {};
  

  constructor(private formbuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.http.get('/api/v1/generate_uid').subscribe((data:any) => {
      this.guid = data.guid;
    }, error => {
        console.log("There was an error generating the proper GUID on the server", error);
    });

   }

   invalidFirstName()
   {
     return (this.submitted && (this.serviceErrors.first_name != null || this.userForm.controls.first_name.errors != null));
   }
 
   invalidLastName()
   {
     return (this.submitted && (this.serviceErrors.last_name != null || this.userForm.controls.last_name.errors != null));
   }
 
   invalidEmail()
   {
     return (this.submitted && (this.serviceErrors.email != null || this.userForm.controls.email.errors != null));
   }
 
   invalidZipcode()
   {
     return (this.submitted && (this.serviceErrors.zipcode != null || this.userForm.controls.zipcode.errors != null));
   }
 
   invalidPassword()
   {
     return (this.submitted && (this.serviceErrors.password != null || this.userForm.controls.password.errors != null));
   }
   
  ngOnInit(){


    this.userForm=this.formbuilder.group({
      first_name :['',Validators.required],
      last_name:['',Validators.required],
      email:['',Validators.required,Validators.email],
      zipcode:['',Validators.required,Validators.pattern('^\d{5}(?:[-\s])\d{4}?$')],
      password:['',Validators.required,Validators.minLength(8),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]  
    });

   

  }

  onSubmit()
  {
  	this.submitted = true;

  	if(this.userForm.invalid == true)
  	{
  		return;
  	}
  	else
  	{
  		let data: any = Object.assign({guid: this.guid}, this.userForm.value);

  		this.http.post('/api/v1/customer', data).subscribe((data:any) => {
	      
	      let path = '/user/' + data.customer.uid;

	      this.router.navigate([path]);
	    }, error =>
	    {
	    	this.serviceErrors = error.error.error;
        });

  		this.registered = true;

  	}
  }

}
