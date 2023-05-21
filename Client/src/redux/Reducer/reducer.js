import {ADD_FAV, FILTER, ORDER, REMOVE_FAV} from '../Actions/types'

const initialState = {
    myFavorites: [],
    allCharacters: [],
    filterGender: "",
};

const rootReducer = (state=initialState, action) => {
    switch (action.type) {
        /*case ADD_FAV:
           return {
                ...state,
                myFavorites: [...state.allCharacters, action.payload],
                allCharacters: [...state.myFavorites, action.payload],
           }*/
        /*case REMOVE_FAV:
            const newList = state.myFavorites.filter((elemento) => elemento.id !== action.payload);
            return {
                ...state,
                myFavorites: newList
           }*/   
        case ADD_FAV:
            return {
                ...state, myFavorites: action.payload, allCharacters: action.payload
            }
        case REMOVE_FAV:
            return {
                ...state, 
                myFavorites: state.filterGender === "" ? action.payload : action.payload.filter((element) => element.gender === state.filterGender), 
                allCharacters: action.payload
           }
        case FILTER:
            const newGender = state.allCharacters.filter((element) => element.gender === action.payload);
            return {
                ...state,
                myFavorites: newGender,
                filterGender: action.payload
         }
         case ORDER:
            if(action.payload === "All") state.filterGender = "";
            let newArray = state.allCharacters.filter((e) => e.gender === state.filterGender) 
            if(newArray.length === 0) newArray = state.allCharacters
            return {
                ...state,
                myFavorites: action.payload === "A" ? newArray.sort((a, b) => a.id - b.id) : newArray.sort((a, b) =>  b.id - a.id)
         } 
         
                
        default:
           return {...state}
    }

};

export default rootReducer;