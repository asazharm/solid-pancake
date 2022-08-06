import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import c from "./Products.module.scss"

const Products = () => {
    const { products, selectedCategory, selectedFilters } = useSelector((state) => state.app)
    const [productsFiltered, setProductsFiltered] = useState([])
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

    useEffect(()=>{
        if (!products || !products.length > 0) return

        const filterProducts = (product) => {
            if (product.category !== selectedCategory) return false

            if (selectedFilters){
                const filters = selectedFilters[selectedCategory]

                const filterKeys = Object.keys(filters)
                const productKeys = Object.keys(product)

                let coincidencesKeys = filterKeys.filter(val => productKeys.includes(val));
                if (!coincidencesKeys) return false

                const coincidences = coincidencesKeys.filter(key => filters[key].includes(product[key]))
                if (coincidences.length === coincidencesKeys.length) return true
            }else return true

        }

        const filteredProducts = products.filter(filterProducts)
        setProductsFiltered(filteredProducts)
    }, [selectedFilters, products])

    const productView = (product) => {
      return (
          <div key={product.id} className={c["product-item"]}>
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
            {productsFiltered && productsFiltered.map(product => productView(product))}
        </div>
    );
}

export default Products;