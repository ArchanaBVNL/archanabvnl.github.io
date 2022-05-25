import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MapsService } from 'src/app/services/maps.service'


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() imgUrl!: Subject<any>
  mapUrl: any;

  constructor(private mapsService: MapsService,) { }

  ngOnInit(): void {
    // set geolocation map Url to display in map component  
    this.imgUrl.subscribe((v) => {
      this.mapUrl = v
    })
  }

}
