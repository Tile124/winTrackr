import { Component, OnInit } from '@angular/core';
import { TestService } from './test-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'test-app';

  constructor(private testService: TestService) { }

  ngOnInit() {
    this.testService.getTitle().subscribe((data: { title: string; }) => this.title = data.title);
    console.log(this.title);
  }
}
