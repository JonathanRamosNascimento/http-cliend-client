import { Product } from './product.model';
import { ProductsService } from './products.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  simpleReqProductsObs$: Observable<Product[]>;

  constructor(
    private productsService: ProductsService){}

  ngOnInit(){
  }
  
  getSimpleHttpRequest() {
    this.simpleReqProductsObs$ = this.productsService.getProducts();
  }
}
