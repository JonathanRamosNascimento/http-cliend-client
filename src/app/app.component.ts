import { Product } from './product.model';
import { ProductsService } from './products.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  simpleReqProductsObs$: Observable<Product[]>;
  productsErrorHandling: Product[];

  constructor(
    private productsService: ProductsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  getSimpleHttpRequest() {
    this.simpleReqProductsObs$ = this.productsService.getProducts();
  }

  getProductsWithErrorHandling() {
    this.productsService.getProductsError().subscribe(
      (prods) => { this.productsErrorHandling = prods; },
      (err) => {
        console.log(err);
        console.log('Message: ' + err.error.msg);
        console.log('Status code: ' + err.status);
        let config = new MatSnackBarConfig();
        config.duration = 2000;
        config.panelClass = ['snack_err'];

        if (err.status == 0) {
          this.snackBar.open('Could not connect to the server', '', config);
        } else {
          this.snackBar.open(err.error.msg, '', config);
        }
      }
    )
  }

  getProductsWithErrorHandlingOk() {
    this.productsService.getProductsDelay().subscribe(
      (prods) => {
        this.productsErrorHandling = prods;
        let config = new MatSnackBarConfig();
        config.duration = 2000;
        config.panelClass = ['snack_ok'];
        this.snackBar.open('Products Successfuly loaded', '', config);
      },
      (err) => {
        console.log(err);
      }
    )
  }
}
