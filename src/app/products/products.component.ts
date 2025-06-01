import { Component,OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  public products : any[] = [];
  constructor(private productService:ProductService) {}
  ngOnInit() :void {

    this.productService.fetchAllProducts().subscribe({
      next:(data)=>{
        console.log(data);

        this.products = data;
      },
      error:(error)=>{
        console.error('Error fetching products:', error);
      }
    })
  }


    deleteProduct(id: number) {
      let res = confirm('Are you sure you want to delete this product?')
      if(res == true)
        this.productService.deleteProduct(id).subscribe({
          next: (response) => {
            console.log('Product deleted successfully:', response);
            // Optionally, refresh the product list or remove the deleted product from the local array
            this.products = this.products.filter(product => product.id !== id);
          },
          error:(error) => {
            console.error('Error deleting product:', error);
          }
        });
    }



}
