import axios from "axios"
import { history } from ".."
import moment from 'moment'

const url = "http://localhost:3004/posts"

export const setAction = (action) => {
    return {
        type: "SET_ACTION",
        payload: action
    }
}

// FETCH -------------------------------------------------------------------
export const fetchItemsSuccess = (value) => {
    return {
        type: "FETCH_ITEMS",
        payload: value
    }
}

export const fetchItemsByStatusSuccess = (data) => {
    return {
        type: "FETCH_ITEMS_BY_STATUS",
        payload: data
    }
}

export const fetchItemsByTitleSuccess = (data) => {
    return {
        type: "FETCH_ITEMS_BY_TITLE",
        payload: data
    }
}

export const fetchItemsLoading = (data) => {
    return {
        type: "FETCH_ITEMS_LOADING",
        payload: data
    }
}

export const fetchItems = () => {
    
    return async(dispatch) => {
        dispatch(fetchItemsLoading(true))
        axios.get(url)
            .then((response) => {
                dispatch(fetchItemsSuccess(response.data)) 
                dispatch(fetchItemsLoading(false))
            })
            .catch((error) => {

            })
    }
}

export const fetchItemsByStatus = (status) => {
    
    return async(dispatch) => {
        dispatch(fetchItemsLoading(true))
        axios.get(url)
            .then((response) => {
                const data = response.data.filter(item => (status==="All") ? item.status : item.status === status)
                dispatch(fetchItemsSuccess(data)) 
                dispatch(fetchItemsLoading(false))
            })
            .catch((error) => {

            })
    }
}

export const fetchItemsByTitle = (text) => {
    
    return async(dispatch) => {
        dispatch(fetchItemsLoading(true))
        axios.get(url)
            .then((response) => {
                const data = response.data.filter(item => item.title.toLowerCase().includes(`${text.toLowerCase()}`))
                dispatch(fetchItemsByTitleSuccess(data)) 
                dispatch(fetchItemsLoading(false))
            })
            .catch((error) => {

            })
    }
}

// CREATE -------------------------------------------------------------------
export const createItemSuccess = (data) => {
    return {
        type: "CREATE_ITEM_SUCCESS",
        payload: data
    }
}

export const createItemFailed = (data) => {
    return {
        type: "CREATE_ITEM_FAILED",
        payload: data
    }
}

export const createItem = (item) => {
    console.log('createItem',item)
    if(item.id){
        //edit
        const data = {
            id: item.id,
            title: item.title,
            status: item.status,
            date: item.date
        }

        return (dispatch) => {
            dispatch(editItem(data))
        }

    } else {
        //create
        const data = {
            title: item.title,
            status: item.status,
            date: moment(item.date).format('ll')
        }
    
        return async(dispatch) => {
            //Validations
            if(data.title.trim() === ""){
                const message = "Title is required."
                console.log('Title is empty.')
                dispatch(createItemFailed(message))
            }
            else if(data.date === "Invalid date"){
                const message = "Date is required."
                console.log('Date is empty.')
                dispatch(createItemFailed(message))
            }
            else if(data.status === "Select Status"){
                const message = "Please select a Status."
                console.log('Status is empty.')
                dispatch(createItemFailed(message))
            }
            else {
                return axios.post(url, data)
                .then((response) => {
                    const id = response.data.id;
                    axios.get(`${url}/${id}`)
                        .then(response => {
                            dispatch(createItemSuccess(response.data))
                            history.push('/')
                        })
                        .catch(error => {
                            console.log(error)
                        })
                })
                .catch(error => {
                    console.log(error)
                })
            }
        }
    }
}

// EDIT -------------------------------------------------------------------
export const editItemSuccess = (data) => {
    return {
        type: "EDIT_ITEM_SUCCESS",
        payload: data
    }
}

export const editItem = (item) => {
    const data = {
        id: item.id,
        title: item.title,
        status: item.status,
        date: moment(item.date).format('ll')
    }
    return async(dispatch) => {
        //Validations
        if(data.title.trim() === ""){
            const message = "Title is required."
            console.log('Title is empty.')
            dispatch(createItemFailed(message))
        }
        else if(data.date === "Invalid date"){
            const message = "Date is required."
            console.log('Date is empty.')
            dispatch(createItemFailed(message))
        }
        else if(data.status === "Select Status"){
            const message = "Please select a Status."
            console.log('Status is empty.')
            dispatch(createItemFailed(message))
        }
        else {
            return axios.put(url + `/${data.id}`, data)
                .then((response) => {
                    return axios.get(`${url}/${data.id}`)
                        .then((response) => {
                            dispatch(editItemSuccess(response.data))
                            history.push('/')
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}
// DELETE -------------------------------------------------------------------
export const deleteItemSuccess = (id) => {
    return {
        type: "DELETE_ITEM_SUCCESS",
        payload: {
            id: id
        }
    }
}

export const deleteItem = (id) => {

    return async(dispatch) => {
        axios.delete(`${url}/${id}`)
            .then((response) => {
                dispatch(deleteItemSuccess(id))
                history.push('/')
            })
            .catch((error) => {
                console.log(error)
            })
    }
}
