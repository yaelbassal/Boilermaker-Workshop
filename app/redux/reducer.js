import axios from 'axios';

//Action Type

const SET_NORTHEAST_PINES = 'SET_NORTHEAST_PINES'

//Action Creator
export const setNorthEastPines = (pines) => {
  return {
    type: SET_NORTHEAST_PINES,
    pines
  }
}

//Thunk Creator for East Coast Pines
export const fetchNorthEastPines = () => {
  return async (dispatch) => {
    const response = await axios.get('/api//northeastpines');
    const pines = response.data
    dispatch(setNorthEastPines(pines))
  }
}


//temporary reducer
export default function nePinesReducer (state = [], action) {
  switch (action.type) {
    case SET_NORTHEAST_PINES:
      return action.pines
    default:
      return state
  }
}
