import {createSlice} from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        products: null,
        categories: null,
        selectedCategory: "Home",
        selectedFilters: null
    },
    reducers: {
        loadProducts: (state, action) => {
            state.products = action.payload
        },
        loadCategories: (state, action) => {
            state.categories = action.payload
        },
        updateSelectedFilters: (state, action) => {
            state.selectedFilters = {...state.selectedFilters, ...action.payload}
        }
    }
})

export const fetchProducts = () => {
    return async dispatch => {
        const response = await fetch('https://62ec043e55d2bd170e7b459a.mockapi.io/products')
        const data = await response.json()
        dispatch(loadProducts(data))
    }
}

export const getCategories = (products) => {
    return async dispatch => {
        let fields = {}

        products.forEach(product => {
            const keys = Object.keys(product)
            if (!(product.category in fields)) fields[product.category] = {"filters":{}}

            keys.forEach(key=>{
                fields[product.category]["filters"][key] ? fields[product.category]["filters"][key].push(product[key]) : fields[product.category]["filters"][key] = [product[key]]
            })
        })

        Object.keys(fields).forEach(category => {
            Object.keys(fields[category]["filters"]).forEach(key=>fields[category]["filters"][key] = [...new Set(fields[category]["filters"][key])])
        })

        dispatch(loadCategories(fields))
    }
}


export const updateFilter = ({ selectedFilters, category, field, value }) => {
    return async dispatch => {
        const tempSelectedFilters = JSON.parse(JSON.stringify(selectedFilters)) ?? {}
        //        const tempSelectedFilters = JSON.parse(JSON.stringify(selectedFilters))
        if (!!tempSelectedFilters?.[category]?.[field]?.includes(value))
            tempSelectedFilters[category][field].splice(tempSelectedFilters[category][field].indexOf(value), 1)
            // tempSelectedFilters[category][field][value] = !tempSelectedFilters[category][field][value]
        else
            tempSelectedFilters[category] = {
            ...tempSelectedFilters?.[category],
            [field]: {
                ...tempSelectedFilters?.[category]?.[field],
                [value]: true
            }
        }
        //
        console.log(tempSelectedFilters)
        dispatch(updateSelectedFilters(tempSelectedFilters))
    }
}

// this is for dispatch
export const { loadProducts, loadCategories, updateSelectedFilters } = appSlice.actions;

// this is for configureStore
export default appSlice.reducer;