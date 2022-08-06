import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import c from "./Products.module.scss"

const Products = () => {
    const { products } = useSelector((state) => state.app)

    // brand: "Hudson Group"
    // category: "Beauty"
    // color: "grey"
    // distance: 11057
    // heatingArea: 39402
    // id: "1"
    // image: "http://loremflickr.com/640/480/technics"
    // price: "515.00"
    // sections: 92371
    // subCategory: "Computers"

    const productView = (product) => {
      return (
          <div className={c["product-item"]}>
              <div className={c["product-item__img-container"]}><img src={product.image} alt={""}/></div>
              <div className={c["product-item__title"]}>{product.name}</div>
              <div className={c["product-item__footer"]}>
                  <div className={c["product-item__footer__price"]}>{product.price}</div>
                  <div className={c["product-item__footer__add-cart"]}>
                      <button>add to cart</button>
                  </div>
              </div>
          </div>
      )
    }
    return (
        <div className={c["products-container"]}>
            {products && products.map(product => productView(product))}
        </div>
    );
}

export default Products;