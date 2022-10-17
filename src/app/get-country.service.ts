import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetCountryService {

  private countryName:string = "";

  setName(name:string){
    this.countryName = name;
  }

  getName():string{
    return this.countryName;
  }
}
