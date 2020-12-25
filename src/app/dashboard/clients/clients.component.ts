import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ApiService} from '../../services/api.service';


export interface ClientModel {
  id: number;
  firstName: string;
  lastName: string;
  mobile: number;
  email: string;
  address: string;
  numberOfOrders: number;
  registerDate: string;
}

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})

export class ClientsComponent implements OnInit {

  clients: ClientModel[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'mobile', 'email', 'address', 'numberOfOrders', 'registerDate'];
  dataSource: MatTableDataSource<ClientModel>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.GetClients().subscribe((data: any[]) => {
      this.clients = data;
      this.dataSource = new MatTableDataSource<ClientModel>(this.clients);
      this.dataSource.sort = this.sort;
    });
  }
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

