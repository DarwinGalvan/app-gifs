import { Component } from '@angular/core';
import { GitsService } from '../../../gifs/services/gits.service';

@Component({
  selector: 'shared-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private gifService:GitsService) { }

  get tags(): string[] {   
    return this.gifService.tagHistory;
  }
  returnTag(tag:string): void {
    this.gifService.searchTag(tag);
  }
}
