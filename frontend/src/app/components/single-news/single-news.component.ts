import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-news',
  templateUrl: './single-news.component.html',
  styleUrls: ['./single-news.component.css'],
})
export class SingleNewsComponent {
  @Input() news: any;
}
