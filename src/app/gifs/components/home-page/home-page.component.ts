import { Component } from '@angular/core';
import { GitsService } from '../../services/gits.service';

@Component({
  selector: 'gifs-home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor(private gifService:GitsService) { 

  }

  get gifs() {
    return this.gifService.gifsList;
  }

}
