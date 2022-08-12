import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts, getCategories} from "./slices/appSlice";
import Header from "./components/header/Header";
import SubHeader from "./components/subHeader/SubHeader";
import Products from "./components/products/Products";
import Filters from "./components/filters/Filters";
import c from "./App.module.scss";
import Banner from "./components/banner/Banner";
import { useMediaQuery } from 'react-responsive'

function App() {
  const dispatch = useDispatch()
  const {products, selectedCategory} = useSelector(state=>state.app)
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 768px)'
  })
  const [filtersOpened, setFiltersOpened] = useState(false)

  useEffect(()=>{
    dispatch(fetchProducts())
  }, [dispatch])

  useEffect(()=>{
    if (!products || !products.length > 0) return
    dispatch(getCategories(products))

  },[dispatch, products])


  return (
    <div className="App">
      {(isDesktopOrLaptop || !filtersOpened)  && <Header/>}
      {(isDesktopOrLaptop || !filtersOpened)  && <SubHeader/>}
      {(isDesktopOrLaptop || !filtersOpened)  && <Banner/>}
      {isDesktopOrLaptop && <div className={c["selected-category"]}>{selectedCategory}</div>}
      <div className={c["catalog-container"]}>
        {((!isDesktopOrLaptop && filtersOpened) || isDesktopOrLaptop)  && <Filters isDesktopOrLaptop={isDesktopOrLaptop} opened={filtersOpened}/>}
        {(isDesktopOrLaptop || !filtersOpened)  && <Products isDesktopOrLaptop={isDesktopOrLaptop} setFiltersOpened={setFiltersOpened}/>}
      </div>
    </div>
  );
}

export default App;
