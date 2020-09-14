import React, { useEffect } from 'react'
import ReviewCloud from './RewviewCloud'
import { connect } from 'react-redux';
import {getReviews, reset } from './actions';

const App = ({reviews, getReviews, reset}) => {
  return (
    <div style={{ display: "flex", height: '80vh'}}>
      <ReviewCloud getReviews={getReviews} reviews={reviews} />
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    reviews: state.reviewRedcuer.reviews,
  }
}

const mapDispatchToProps = dispatch => ({
  getReviews: appId => dispatch(getReviews(appId)),
  reset: () => dispatch(reset())
})


export default connect(mapStateToProps, mapDispatchToProps)(App);