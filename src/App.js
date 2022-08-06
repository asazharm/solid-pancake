import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts, getCategories} from "./slices/appSlice";
import Products from "./components/products/Products";
import Filters from "./components/filters/Filters";
import c from "./App.module.scss";


function App() {
  const dispatch = useDispatch()
  const {products} = useSelector(state=>state.app)

  useEffect(()=>{
    dispatch(fetchProducts())
  }, [dispatch])

  useEffect(()=>{
    if (!products || !products.length > 0) return
    dispatch(getCategories(products))

  },[dispatch, products])


  return (
    <div className="App">
      <div className={c["catalog-container"]}>
        <Filters/>
        <Products/>
      </div>
    </div>
  );
}

export default App;
