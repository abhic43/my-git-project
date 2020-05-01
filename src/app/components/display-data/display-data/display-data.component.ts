import { Component, OnInit } from '@angular/core';
import { UserInfoModel } from 'src/app/models/user-info-model.model';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-display-data',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.scss']
})
export class DisplayDataComponent implements OnInit {

  user:UserInfoModel =new UserInfoModel(
    {guid:'DBB3HUH3BG',
    customerUid: "cust2dsa12dsa", 
		first_name: "John", 
		last_name: "Doe", 
		email: "email@email.com", 
		zipcode: 10283,
		password: "Idasn2x2#"}
  );
    constructor(private http: HttpClient, private route: ActivatedRoute) { }

    private subscriber: any;

  ngOnInit() {
    this.subscriber = this.route.params.subscribe(params => {
	       
      this.http.get('/api/v1/customer/' + params.uid).subscribe((data:any) => {

     this.user = new UserInfoModel(data.customer);
     });
   });
  }

}
