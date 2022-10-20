import { Component, OnInit } from '@angular/core';
import { GetCountryService } from '../get-country.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css'],
})
export class CountryDetailsComponent implements OnInit {
  countryName: string = '';
  country: any = [];
  nativeName: string = '';
  capitals = [];
  currencies:any = [];
  languages:any = [];
  borders:any = [];
  borderName:any = [];

  constructor(
    private countryService: GetCountryService,
    private http: HttpClient
  ) {}

 ngOnInit() {
   
    this.countryName = this.countryService.getName();
 
    this.http
      .get('https://restcountries.com/v3.1/name/' + this.countryName) // + this.countryName
      .pipe(
        map((responseData: any) => {
          const postsArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        })
      )
      .subscribe((data) => {
        this.country = data;
        console.log(data);
        const native = this.country[0].name.nativeName; //because the key changes based on the country's languages
        const nativeKeys = Object.keys(native)[0];
        this.nativeName = this.country[0].name.nativeName[nativeKeys].common;

        const currency = this.country[0].currencies;
        const currencyKeys = Object.keys(currency);
        for(let i =0; i<currencyKeys.length; i++){
        this.currencies.push(" " + this.country[0].currencies[currencyKeys[i]].name);
        }

        const language = this.country[0].languages;
        const languageKeys = Object.values(language)
        for(let i =0; i<languageKeys.length; i++){
          this.languages.push(" " + languageKeys[i]);
        }

        
        for(let i = 0; i<this.country[0].borders.length; i++) {
          this.getCountryName(this.country[0].borders[i]);
        }
        
      });

     
  }

  getCountryName(code:any) { //get country name by alpha code for borders
   
    this.http
      .get('https://restcountries.com/v3.1/alpha/' + code + '?fields=name')
      .pipe(
        map((responseData: any) => {
          const postsArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        })
      )
      .subscribe((data) => {
        this.borderName.push(data[0].common);
        
      });
      
  }
}
