import {Component, OnInit} from '@angular/core';
import {HeaderService} from './core/services/header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false
})
export class AppComponent implements OnInit {
  constructor(private headerService: HeaderService) {}

  ngOnInit(): void {
    this.headerService.loadTheme()
    this.headerService.loadLanguage()
    this.headerService.loadAuthentication()
  }
}
