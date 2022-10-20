import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'rest-countries-api-main';

  isDark = true;
  changeMode() {
    this.isDark = !this.isDark;
    if(this.isDark == false) {
      document.documentElement.style.setProperty(
        '--dark-elements',
        'hsl(0, 0%, 100%)'
      );
      document.documentElement.style.setProperty(
        '--dark-background',
        'hsl(0, 0%, 98%)'
      );
      document.documentElement.style.setProperty(
        '--dark-text',
        'hsl(200, 15%, 8%)'
      );
    }
    else {
      document.documentElement.style.setProperty(
        '--dark-elements',
        'hsl(209, 23%, 22%)'
      );
      document.documentElement.style.setProperty(
        '--dark-background',
        'hsl(207, 26%, 17%)'
      );
      document.documentElement.style.setProperty(
        '--dark-text',
        'hsl(0, 0%, 100%)'
      );
    }
  }

  checkMode() {
    return this.isDark? "fa-solid fa-moon":"fa-regular fa-moon";
  }
}


