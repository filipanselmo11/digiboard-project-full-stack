import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ ToolbarComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.getUser().subscribe((res) => {
      console.log('RES ', res);
    })
  }
}
