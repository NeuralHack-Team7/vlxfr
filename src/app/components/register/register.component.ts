import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { UserRegistrationService } from 'src/app/user-registration.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  message:any;

user: any ={
	"first_Name":"",
	"middle_Name":"",
	"last_Name":"",
	"emailId":"",
	"password":"",
	"userLoginDAO":{
	"emailId":"",
	"password":""
	},
	"userAddressDAO":
	{"mobile":"",
	"city":"",
	"state":"",
	"pincode":""},
	"userIdProofDAO":
	{
	"id_type":"adhaar",
	"id_link":"././././././",
	"id_num":"",
	"verify":"pending"
	}
};
  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private service:UserRegistrationService
  ) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/']);
        }
    }
    selectedFile: File;
  
  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          first_Name: ['', Validators.required],
          middle_Name: [''],
          last_Name: [''],
          state: ['', Validators.required],
          city: ['', Validators.required],
          pincode:['', Validators.required],
          id_num:['', Validators.required],
          id_type:['', Validators.required],
          mobile:['', Validators.required],
          emailId: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });
    
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  
  onSubmit() {
    this.submitted = true;
    // reset alerts on submit

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    console.log(this.registerForm);
    alert("Button is clicked");
    this.loading = true;
    this.userService.register(this.registerForm.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate(['/login']);
            },
            error => {
                this.loading = false;
            });
}
public onFileChanged(event) {
        //Select File
        this.selectedFile = event.target.files[0];
      }
  public registerNow(){
      // console.log(this.registerForm);
    // console.log(this.registerForm.get("first_Name").value); 
    this.user.first_Name=this.registerForm.get("first_Name").value;
    this.user.last_Name=this.registerForm.get("last_Name").value;
    this.user.middle_Name=this.registerForm.get("middle_Name").value;
    this.user.emailId=this.registerForm.get("emailId").value;
    this.user.password=this.registerForm.get("password").value;

    this.user.userLoginDAO.emailId=this.registerForm.get("emailId").value;
    this.user.userLoginDAO.password=this.registerForm.get("password").value;

    this.user.userAddressDAO.state=this.registerForm.get("state").value;
    this.user.userAddressDAO.city=this.registerForm.get("city").value;
    this.user.userAddressDAO.pincode=this.registerForm.get("pincode").value;
    this.user.userAddressDAO.mobile=this.registerForm.get("mobile").value;
    // this.user.userIdProofDAO.append('imageFile', this.selectedFile, this.selectedFile.name);
    // this.user.userIdProofDAO.picByte[0]=(this.selectedFile);
    this.user.userIdProofDAO.id_num=this.registerForm.get("id_num").value;
    // this.user.userIdProofDAO.id_type=this.registerForm.get("").value;
    // const uploadImageData = new FormData();

    // uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    // console.log(uploadImageData);
    // console.log(this.user);
    console.log("Establishing Connection...Sending Request");
   let resp= this.service.doRegistration(this.user);

  
   
//    resp.subscribe(
//        {
//            error: error => console.error("there is an error!",error)
//        }
//    );
    // console.log(event);  
    // alert("Registration Successfull..Wait for admin to review");
 }
}
