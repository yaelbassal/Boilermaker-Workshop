import React from 'react';
import { connect } from 'react-redux';
import {fetchNorthEastPines} from '../redux/reducer';

export class NEPines extends React.Component {
  constructor(){
    super()
  }

  render() {
    return (
      <div>
        <h1>Pines of the North East</h1>
        <h3>Below you will find common pines from throughout the North Eastern United States, can you find yours?</h3>
        {/* //here we will have a listing of common pines */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    pines: state.pines
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNorthEastPines: () => dispatch(fetchNorthEastPines())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NEPines)
