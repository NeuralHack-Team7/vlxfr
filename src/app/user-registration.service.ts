import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  constructor(private http:HttpClient) { }

  public doRegistration(user){
    console.log(user);
    
    return this.http.post<any>("http://localhost:8080/user/save",user,{ observe: 'response' }).subscribe((response) => {
    
              if (response.status === 200) {
    
                console.log('Image uploaded successfully');
    
              } else {
    
                console.log('Image not uploaded successfully');
    
              }
  
            }
        );
  }
}
