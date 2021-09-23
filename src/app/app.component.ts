import { ApiService } from './api.service';
import { Component, OnInit } from '@angular/core';
import { ResponseSupplier, Supplier } from './supplier.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'SupplierCallAPI';
  responseSupliers: ResponseSupplier;
  listSuppliers: Supplier[];
  pageIndex = 1;
  totalPerPage = 4;
  totalPage = 0;

  constructor(private apiService: ApiService) {} //inject

  ngOnInit(): void {
    this.getSupplier(this.pageIndex, this.totalPerPage);
  }

  getSupplier(pageIndex?: number, pageSize?: number) {
    this.apiService.getSupplier(pageIndex, pageSize).subscribe((res) => {
      this.responseSupliers = res;
      this.listSuppliers = res.items;
      this.totalPage = this.getTotalPage(res.totalCount); // nếu để res= this.responseSupplier se loi
      console.log(this.responseSupliers);
    });
  }

  getTotalPage(totalCount: number) {
    if (totalCount % this.totalPerPage === 0) {
      return totalCount / this.totalPerPage;
    } else {
      return Math.floor(totalCount / this.totalPerPage) + 1;
    }
  }

  loadSupplierPrev() {
    if (this.pageIndex === 1) {
      return;
    } else if (this.pageIndex > 1) {
      this.pageIndex = this.pageIndex - 1;
      this.getSupplier(this.pageIndex, this.totalPerPage);
    }
  }

  loadSupplierNext() {
    let totalPage = this.getTotalPage(this.responseSupliers.totalCount);
    if (this.pageIndex == totalPage) {
      return;
    } else {
      // ko hiểu : this.getSupplier(this.pageIndex++, this.totalPerPage); thì pageindex lúc tăng lúc không tăng
      this.pageIndex = this.pageIndex + 1;
      this.getSupplier(this.pageIndex, this.totalPerPage);
    }
  }

  loadSuppliersOfPage(pageIndex: number) {
    if (pageIndex <= this.totalPage && pageIndex > 0) {
      this.getSupplier(pageIndex, this.totalPerPage);
    }
  }
}
