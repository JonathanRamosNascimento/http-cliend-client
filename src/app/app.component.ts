import { ProductsService } from './products.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private productsService: ProductsService){}

  ngOnInit(){
    this.productsService.getProducts().subscribe(prods => console.log(prods));
  }
}
