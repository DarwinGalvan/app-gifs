import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  standalone: false,
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.css'
})
export class LazyImageComponent implements OnInit {

  @Input() url!: string;
  @Input() alt: string = '';

  public loaded: boolean = false;

  constructor() { }

  ngOnInit() {
    if (!this.url) throw new Error('Attribute url is required');
  }

  public onLoad() {
    this.loaded = true;
  }

}
