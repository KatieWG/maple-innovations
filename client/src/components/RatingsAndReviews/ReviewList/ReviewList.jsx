import React from 'react';
import ReviewListEntry from './ReviewListEntry.jsx';
import ReviewModal from './ReviewModal/ReviewModal.jsx';

  class ReviewList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        reviewCount: 2,
        showModal: false,
        reviewEntries: this.props.product.results
      }

    // console.log('ReviewList Props: ', this.props);
    console.log('reviewEntries: ', this.props.product.results)
    this.addMoreReviews = this.addMoreReviews.bind(this);
    this.showModalState = this.showModalState.bind(this);
    this.sortEntries = this.sortEntries.bind(this);
  }

  addMoreReviews() {
    this.setState({
      reviewCount: this.state.reviewCount += 2
    })
  }

  showModalState() {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  sortEntries(event) {
    let selectedSortMethod = event.target.value
    console.log('2 sorting', selectedSortMethod)
    // selectedSortMethod === "Relevant" ? this.state.reviewEntries
    // selectedSortMethod === "Helpful"
    // selectedSortMethod === "Newest"

  }



  render() {
    const {reviewCount, showModal} = this.state
    return (
      <div>
        <div className="review-list-sort">
          {this.state.reviewEntries.length} reviews sorted by {" "}
          <select className="review-sort-select" onChange={this.sortEntries} name="selectedReviewSort">
            <option defaultValue>Sort On</option>
            <option>Relevant</option>
            <option>Helpful</option>
            <option>Newest</option>
          </select>
        </div>
        <div>
          {this.state.reviewEntries.slice(0, reviewCount).map((review, key) => (
            <ReviewListEntry
              review={review}
              key={key}
              productRating={this.props.productRating}
            />
          ))}
        </div>
        <div>
          {(this.props.product.results.length < 2 && this.state.reviewEntries.length !== 0) || this.state.reviewEntries.length >= reviewCount ? (<button onClick={this.addMoreReviews}>More+</button>) : null}
          <div className="review-list-show-modal-button">
            <button onClick={this.showModalState}>Add New Review</button>
            {showModal ? (<ReviewModal showModalState={this.showModalState}/>) : null}
          </div>
        </div>
      </div>
    )
  }
}

export default ReviewList;