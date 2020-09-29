import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
//
import { HttpClient } from '@angular/common/http';
//
import { ItemService } from '../service/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  form:  FormGroup;
  public id: number;
  public item: any;
  imageSrc: string;
  
  constructor(private itemService: ItemService, private router: Router) { }

  ngOnInit(): void {
    this.form=new FormGroup({
      name : new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z ]*')
      ])),
      model : new FormControl("", Validators.compose([
        Validators.required,
        //Validators.minLength(3),
        Validators.pattern('[a-zA-Z ]*')
      ])),
      product_type : new FormControl("", Validators.required),
      /*email : new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ])),*/
      price : new FormControl("",  Validators.compose([
        Validators.required,
        //Validators.pattern('^[1-9]\d{0,7}(?:\.\d{1,4})?|\.\d{1,4}$')
        Validators.pattern('^[0-9]\d+$')
      ])),
      age : new FormControl("",  Validators.compose([
        Validators.required,
        //Validators.pattern('^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$')
        Validators.pattern('^[0-9]\d+$')
      ])),
      file: new FormControl('', [Validators.required]),
      //fileSource: new FormControl('', [Validators.required])
    })
  }
  //
  //constructor(private http: HttpClient) { }
  get f(){
    return this.form.controls;
  }
  //
//
  onFileChange(event) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;
     
        this.form.patchValue({
          fileSource: reader.result
        });
   
      };
   
    }
  }
//



  addItem(item){
    this.itemService.getItems().subscribe((res: any)=>{
      if(res.length == 0)
        this.id = 1
      else
        this.id = res[res.length-1].id+1
    })
    //need to write the code in this file for getting the image to backend.
    this.item = {id: this.id, name: item.name, product_type: item.product_type, model: item.model, file: item.file, age: item.age, price: item.price }
    this.itemService.addItem(this.item).subscribe((res) =>{
      this.router.navigate(['/items']);
    });
  }

}
