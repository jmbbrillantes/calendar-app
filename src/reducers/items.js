const INITIAL_STATE = {
    items: [],
    error: null,
    isLoading: false,
    action: ''
}

const itemsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case "SET_ACTION":
            return {...state, action: action.payload};
        case "FETCH_ITEMS": 
            return {...state, items: action.payload};
        case "FETCH_ITEMS_BY_TITLE": 
            return {...state, items: action.payload};
        case "FETCH_ITEMS_BY_STATUS": 
            return {...state, items: action.payload};
        case "FETCH_ITEMS_LOADING":
            return {...state, isLoading: action.payload};
        case "CREATE_ITEM_SUCCESS":
            return {...state, items: [...state.items, action.payload]};
        case "CREATE_ITEM_FAILED":
            return {...state, error: action.payload};
        case "EDIT_ITEM_SUCCESS":
            const updatedItems = state.items.filter(item => item.id !==  action.payload.id)
            return {...state, items: [...updatedItems, action.payload]};
        case "EDIT_ITEM_ERROR":
            return {...state, error: action.payload};
        default:
            return state;
    }
}

export default itemsReducer;