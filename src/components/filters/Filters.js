import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import c from "./Filters.module.scss";
import {updateFilter} from "../../slices/appSlice";
import RangeSlider from "../rangeSlider/RangeSlider";

const Filters = () => {
    const dispatch = useDispatch()
    const { categories, selectedCategory, selectedFilters } = useSelector(state=>state.app)

    const filterHandle = ({field, value, type}) => {
        dispatch(updateFilter({
            selectedFilters: selectedFilters,
            category: selectedCategory,
            field,
            value,
            type
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

        return type && <div key={name}>
            <p>{name}</p>
            <div className={c["filter-" + type]}>
                {type === "checkbox" && values.map(value=>{
                    return(
                        <div key={value}>
                            <input type={type} onClick={()=>filterHandle({field:name, value, type})}/>
                            <label>{value}</label>
                        </div>
                    )
                })}
                {type === "range" && <RangeSlider
                        min={100}
                        max={200}
                        // min={Math.min(...values)}
                        // max={Math.max(...values)}
                        onChange={({ min, max }) => filterHandle({field:name, value:[min, max], type})}
                    />
                }
                    {/*<input type="range" min={Math.min(values)} max={Math.max(values)} multiple={true}/>*/}
            </div>
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