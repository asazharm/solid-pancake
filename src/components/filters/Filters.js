import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import c from "./Filters.module.scss";
import {updateFilter} from "../../slices/appSlice";

const Filters = () => {
    const dispatch = useDispatch()
    const { categories, selectedCategory, selectedFilters } = useSelector(state=>state.app)

    const filterClickHandle = ({field, value}) => {
        dispatch(updateFilter({
            selectedFilters: selectedFilters,
            category: selectedCategory,
            field,
            value
        }))
    }


    const getFilterView = (name, values) => {
        let type

        switch (name){
            case "price":
                type = "range"
                break
            case "brand":
            case "sections":
            case "distance":
            case "subCategory":
            case "color":
            case "heatingArea":
                type = "checkbox"
                break
            default:
                type = null
        }

        return type && <div>
            <p>{name}</p>
            <div className={c["filter-" + type]}>{values.map(value=>{
                return(
                    <>
                        <input type={type} onClick={()=>filterClickHandle({field:name, value})}/>
                        <label>{value}</label>
                    </>
                )
            })}</div>
        </div>

    }


    return (
        <div className={c["filters-container"]}>
            {categories && Object.keys(categories).map(category => {
                if (category === selectedCategory)
                    return Object.keys(categories[category]["filters"]).map(key=>getFilterView(key, categories[category]["filters"][key]))
                return null
            })}
        </div>
    );
}

export default Filters