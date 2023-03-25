import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkboxes',
  templateUrl: './checkboxes.component.html',
  styleUrls: ['./checkboxes.component.css'],
})
export class CheckboxesComponent {
  checked: { [key: string]: boolean } = {};
  sources: string[] = [];
  availableSources: string[] = [
    'Google News',
    'BBC News',
    'CNN',
    'The Indian Express',
    'Forbes',
    'The Times of India',
    'Moneycontrol',
    'Yahoo Entertainment',
    'The Guardian',
    'ABC News',
    'BBC Sport',
    'Bloomberg',
    'Business Insider',
    'Buzzfeed',
    'CBC News',
  ];

  @Output() sourcesChanged: any = new EventEmitter<string>();
  handleChange(checkbox: any) {
    let value: string = checkbox.value;

    this.checked[value] == true
      ? (this.checked[value] = false)
      : (this.checked[value] = true);
    this.addSkill();
  }
  addSkill() {
    this.sources = Object.keys(this.checked).filter((key) => this.checked[key]);
    this.sourcesChanged.emit(this.sources);
  }
}
