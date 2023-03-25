import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: [boolean, string] = [false, ''];
  constructor(private api: ApiService, private router: Router) {}
  ngOnInit(): void {
    this.api.setProfile();
    this.user = this.api.user;
  }
  logout(): void {
    localStorage.removeItem('nf_token');
    this.api.setProfile();
    this.router.navigate(['/login']);
  }
}
