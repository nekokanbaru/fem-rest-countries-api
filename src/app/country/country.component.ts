import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
})
export class CountryComponent implements OnInit {
  constructor(private http: HttpClient) {}

  countries: any = [];
  countriesArray: any = [];
  error = false;
  selectedRegion: string = 'Filter by Region';

  ngOnInit() {
    this.fetchCountries();
  }

  private async fetchCountries() {
    this.error = false;
    this.http
      .get('https://restcountries.com/v3.1/all')
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
        this.countries = data;

        let arrayOfNumbers: any = [];
        while (arrayOfNumbers.length < 8) {
          let number = Math.floor(Math.random() * this.countries.length);
          if (arrayOfNumbers.indexOf(number) === -1) {
            arrayOfNumbers.push(number);
          }
        }
        for (let i = 0; i < arrayOfNumbers.length; i++) {
          this.countriesArray.push(this.countries[arrayOfNumbers[i]]);
        }
      });
  }

  timeout: any;
  countryName: string = '';

  countrySearch() {
    this.error = false;
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.countriesArray = []; //clear countries before displaying the searched ones

      if (this.countryName == '') {
        this.fetchCountries();
      } else {
        this.http
          .get('https://restcountries.com/v3.1/name/' + this.countryName)
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
          .subscribe(
            (data) => {
              this.countries = data;
              for (let i = 0; i < this.countries.length; i++) {
                this.countriesArray.push(this.countries[i]);
              }
            },
            (error) => {
              this.error = true;
              this.countriesArray = []; //clear countries if error happens
              this.countries = [];
              console.log(error);
            }
          );
      }
    }, 1000);
  }

  regionFilter() {
    //https://restcountries.com/v3.1/region/{region}
    this.error = false;

    this.countriesArray = []; //clear countries before displaying the searched ones
    this.http
      .get('https://restcountries.com/v3.1/region/' + this.selectedRegion)
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
        this.countries = data;
        for (let i = 0; i < this.countries.length; i++) {
          this.countriesArray.push(this.countries[i]);
        }
      });
  }
}
