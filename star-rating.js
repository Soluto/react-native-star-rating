// React and react native imports
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import React, {
  Component,
  PropTypes,
} from 'react';

// Local file imports
import StarButton from './star-button';

const styles = StyleSheet.create({
  starRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

class StarRating extends Component {

  constructor(props) {
    super(props);

    this.state = {
      maxStars: this.props.maxStars,
    };

    this.onStarButtonPress = this.onStarButtonPress.bind(this);
  }

  onStarButtonPress(rating) {
    this.props.selectedStar(rating);
  }

  round(number) {
    return (Math.round(number * 2) / 2);
  }

  render() {
    // Round rating down to nearest .5 star
    let starsLeft = this.round(this.props.rating);
    let starButtons = [];

    for (let i = 0; i < this.state.maxStars; i++) {
      let starIcon = this.props.emptyStar;         

      if (starsLeft >= 1) {
        starIcon = this.props.fullStar;        
      } else if (starsLeft === 0.5) {
        starIcon = this.props.halfStar;        
      }

      let starTitle = '';
      let starTitleStyle = this.props.starTitlesUnselectedStyle;
      if (this.props.rating == 0) {
        if ((i+1) === 1) {
          starTitle = this.props.starTitles[i];          
        }
        if ((i+1) === this.props.maxStars) {
          starTitle = this.props.starTitles[i];          
        }          
      }
      else if (this.props.rating==(i+1)) {
        starTitle = this.props.starTitles[i];          
        starTitleStyle = this.props.starTitleSelectedStyle;
      }

      starButtons.push(
        <StarButton
          activeOpacity={0.20}
          disabled={this.props.disabled}
          key={i}
          rating={i + 1}
          onStarButtonPress={this.onStarButtonPress}         
          starIcon={starIcon}          
          starTitle={starTitle}
          starTitleStyle={starTitleStyle}
        />
      );
      starsLeft--;
    }

    return (
      <View style={styles.starRatingContainer}>
        {starButtons}
      </View>
    );
  }
}

StarRating.propTypes = {
  disabled: PropTypes.bool,
  emptyStar: PropTypes.element,
  fullStar: PropTypes.element,
  halfStar: PropTypes.element,  
  maxStars: PropTypes.number,
  rating: PropTypes.number,
  selectedStar: PropTypes.func.isRequired,
  starTitles: PropTypes.arrayOf(PropTypes.string),
  starTitlesUnselectedStyle: Text.propTypes.style,
  starTitleSelectedStyle: Text.propTypes.style
};

StarRating.defaultProps = {
  disabled: false,
  emptyStar: <Text>empty</Text>,
  fullStar: <Text>full</Text>,
  halfStar: <Text>half</Text>,  
  maxStars: 5,
  rating: 0  
};

export default StarRating;
