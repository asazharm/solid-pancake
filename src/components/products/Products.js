import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import c from "./Products.module.scss"

export default function Products(props) {
    const { isDesktopOrLaptop, setFiltersOpened } = props
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
                {/* {product.isSale && <div>Акция</div>} */}
                <div className={c["product-item__sale"]}>% Акция</div>
                <div className={c["product-item__img"]}>
                    <img src={product.image} alt={""}/>
                </div>
                <div className={c["product-item__title"]}>{product.name + "Биметаллический радиатор Royal Thermo Indigo Super "}</div>
                <div className={c["product-item__footer"]}>
                    <div>
                        <div className={c["product-item__footer__price"]}>{new Intl.NumberFormat('ru-RU').format(product.price)}</div>
                        {/* {product.isSale && <div className={c["product-item__footer__sale-price"]}>{new Intl.NumberFormat('ru-RU').format(product.salePrice)}</div> */}
                        <div className={c["product-item__footer__sale-price"]}>{new Intl.NumberFormat('ru-RU').format(product.salePrice)}</div>
                    </div>
                    <button className={c["product-item__footer__cart-btn"]}>
                        <img src="images/cart.svg" alt="cart"/>
                    </button>
                </div>
          </div>
      )
    }
    return (
        <div className={c["products"]}>
            {!isDesktopOrLaptop && <p>{selectedCategory}</p>}
            {!isDesktopOrLaptop && <div className={c["products-count"]}><p>{productsFiltered.length*104}</p> <p>{['1', '2', '3', '4'].includes(String(productsFiltered.length*104).slice(-1)) ? "товара" : "товаров" }</p></div>}

            <div className={c["products-header"]}>
                {!isDesktopOrLaptop && <button className={c["products-header__filters-btn"]} onClick={()=>{setFiltersOpened(true)}}><img src='images/chart.svg' alt='chart'/><p>Фильтры</p></button>}
                {isDesktopOrLaptop && <div className={c["products-count"]}><p>{productsFiltered.length*104}</p> <p>{['1', '2', '3', '4'].includes(String(productsFiltered.length*104).slice(-1)) ? "товара" : "товаров" }</p></div>}

                <button className={c["products-header__sort-drop"]}><p>Сортировка</p><img src='images/arrow_bot.svg' alt='arrow'/></button>
            </div>

            <div className={c["products-container"]}>
                {productsFiltered && productsFiltered.map(product => productView(product))}
            </div>
        </div>
    );
}