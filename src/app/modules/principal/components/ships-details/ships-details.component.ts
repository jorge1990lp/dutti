import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { ShipsService } from 'src/app/services/ships.service';
declare var $: any;


@Component({
  selector: 'ships-details',
  templateUrl: './ships-details.component.html',
  styleUrls: ['./ships-details.component.scss']
})
export class ShipsDetailsComponent implements OnInit {

  @Input() dataList: any;
  config: any;
  shipId: string = '';
  url: string = '';
  // Modal
  titleDetails: string = '';
  modelDetails: string = '';
  starship_class: string = '';

  constructor( private shipsService: ShipsService) { 
  }
  
  ngOnInit(): void {
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: 10
      };
  }

  ngOnChanges(change: SimpleChange) {
    if(this.config) {
      this.config.totalItems = this.dataList.count;
    }
  }

  pageChanged(event){
    this.shipsService.getShips(event).subscribe(resp => {
      this.dataList = resp;
    });
    this.config.currentPage = event;
  }

  openDetails(details) {
    $("#exampleModal").modal('show');
    this.titleDetails = details.name;
    this.modelDetails = details.model;
    this.starship_class = details.starship_class
  }

}
