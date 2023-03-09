import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Developer } from 'src/app/models/developer/developer';
import { AuthService } from 'src/app/services/auth.service';
import { DeveloperService } from 'src/app/services/developer.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent implements OnInit {
  developers!: Developer[];
  isLoggedIn = false;
  webDevelopers!: Developer[];

  constructor(
    private developerService: DeveloperService,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.developers = [];
    this.webDevelopers = [];

    this.developerService.getDeveloperBoard().subscribe({
      next: (data: any) => {
        this.developers = data;
        this.webDevelopers = this.developers.filter((dev) => dev.type == 'web');
        console.log(this.webDevelopers);
      },
    });

    // Check the obserbable status
    this.authService.isLoggedIn.subscribe((status) => {
      this.isLoggedIn = status;
    });
    // Check if user is in localStorage
    this.isLoggedIn = this.storageService.isLoggedIn();
  }
}
