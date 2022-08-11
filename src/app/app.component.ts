import { Component, OnInit } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService:AuthService, private logService:LoggingService){}
  ngOnInit(): void {
    this.authService.autoLogin()
    this.logService.printLog('Hello From AppComponent')
  }

}
