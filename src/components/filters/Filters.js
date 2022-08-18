import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import c from "./Filters.module.scss";
import {updateFilter, resetFilters} from "../../slices/appSlice";
// import { Slider, RangeSlider } from 'rsuite';

export default function Filters(props) {
    const { setFiltersOpened } = props
    const dispatch = useDispatch()
    const { categories, selectedCategory, selectedFilters } = useSelector(state=>state.app)
    const defaultFiltersOrder = ["subCategory", "brand", "price", "sections", "distance", "heatingArea", "color"]
    const [expandedFilters, setExpandedFilters] = useState(defaultFiltersOrder)
    const filterHandle = ({field, value, type}) => {
        dispatch(updateFilter({
            selectedFilters: selectedFilters,
            category: selectedCategory,
            field,
            value,
            type
        }))
    }

    const resetFilterHandle = () => {
        dispatch(resetFilters())
    }

    const getFilterView = (name, values) => {
        let type

        switch (name){
            case "price":
                type = "range"
                break
            case "color":
                type = "color-checkbox"
                break
            case "brand":
            case "sections":
            case "distance":
            case "subCategory":
            case "heatingArea":
                type = "checkbox"
                break
            default:
                type = null
        }

        return type && 
        <div key={name} className={`${c["filter"]} ${expandedFilters?.includes(name) ? c["filter_active"] : "" }`}>
            <div className={`${c["filter__header"]} ${expandedFilters?.includes(name) ? c["filter__header_active"] : "" }`} onClick={()=>{
                let temp = JSON.parse(JSON.stringify(expandedFilters))

                if (temp.includes(name)){
                    temp.splice(expandedFilters.indexOf(name), 1)
                    setExpandedFilters(temp)
                }else {
                    temp.push(name)
                    setExpandedFilters(temp)
                }
            }}>
                <p>{name === "subCategory" ? selectedCategory : name}</p>
                <img src="images/arrow_bot.svg" alt="arrow"/>
            </div>
            <div className={`${c["filter__body"]} ${expandedFilters?.includes(name) ? c["filter__body_active"] : "" } ${c["filter__body_type_" + type]}`}>
                {(type === "checkbox" || type === "color-checkbox") && values.map(value=>{
                    return(
                        <div key={value}>
                            <input type={"checkbox"} style={{"--color": value}} onClick={()=>filterHandle({field:name, value, type})} checked={selectedFilters?.[selectedCategory]?.[name]?.includes(value)}/>
                            <label>{value}</label>
                        </div>
                    )
                })}
                {/* {type === "range" && <RangeSlider
                        min={100}
                        max={200}
                         min={Math.min(...values)}
                         max={Math.max(...values)}
                        onChange={({ min, max }) => filterHandle({field:name, value:[min, max], type})}
                    />
                } */}
                    {type === "range" && <input type="range" min={Math.min(values)} max={Math.max(values)} multiple={true}/>}
            </div>
        </div>

    }


    return (
        <div className={c["filters"]}>
            <div className={c["filters__container"]}>
                <p>Фильтры</p>  
                {categories && Object.keys(categories).map(category => {
                    if (category === selectedCategory)
                        return defaultFiltersOrder.map(key=>getFilterView(key, categories[category]["filters"][key]))
                    return null
                })}
            </div>
            <div className={c["filters__actions"]}>
                <button className={c["filters__actions__apply"]} onClick={()=>{setFiltersOpened(false)}}> 
                    <div>
                        <img src="images/arrow.svg" alt="" />
                    </div>
                    <p>Применить</p>
                </button>
                <button className={c["filters__actions__reset"]} onClick={()=>{
                        resetFilterHandle()
                        setFiltersOpened(false)
                    }}><p>Сбросить</p><img src='images/close.svg' alt='arrow'/></button>
            </div>
        </div>
    );
}