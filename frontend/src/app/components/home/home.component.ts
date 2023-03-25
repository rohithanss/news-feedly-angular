import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  newsData: { status: null | boolean; data: any[] } = {
    status: null,
    data: [],
  };
  sources: string[] = [];
  search: any = '';
  page: number = 1;
  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.getData(this.sources, this.search, this.page);
  }

  getData(source: string[], search: string, page: number): void {
    this.newsData = { status: null, data: [] };
    this.api.getNews(source, search, page).subscribe(
      (value: any) => {
        if (value.status == 'success') {
          this.newsData.data = value.news;
          this.newsData.status = true;
        } else {
          this.newsData.status = false;
        }
      },
      (err: any) => {
        this.newsData.status = false;
      }
    );
  }

  sourcesChanged(event: any) {
    this.sources = event;
    this.getData(this.sources, this.search, this.page);
  }
  searchNews(): void {
    this.getData(this.sources, this.search, this.page);
  }

  prevPage() {
    this.page--;
    this.getData(this.sources, this.search, this.page);
  }
  nextPage() {
    this.page++;
    this.getData(this.sources, this.search, this.page);
  }
}
