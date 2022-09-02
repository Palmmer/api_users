import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-section',
  templateUrl: './admin-section.component.html',
  styleUrls: ['./admin-section.component.scss']
})
export class AdminSectionComponent implements OnInit {

  change_section = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  changeSection(num: number) {
    if (num === 1) {
      this.change_section = true;
    }
    if (num === 2) {
      this.change_section = false;
    }
  }

  logOut() {
    this.router.navigate(['auth']);
  }

}
