// React and react native imports
import React, {
  Component
} from 'react';

import PropTypes from 'prop-types';

import {
  View,  
  Text,
  StyleSheet  
} from 'react-native';

// Third party imports
import Button from 'react-native-button';

class StarButton extends Component {

  constructor(props) {
    super(props);

    this.onButtonPress = this.onButtonPress.bind(this);
  }

  onButtonPress() {
    this.props.onStarButtonPress(this.props.rating);
  }

  render() {
    return (
      <View style={style.container}>
        <Text style={this.props.starTitleStyle}>{this.props.starTitle}</Text>
        <Button
          activeOpacity={0.20}
          disabled={this.props.disabled}
          onPress={this.onButtonPress}
        >
        {this.props.starIcon}        
        </Button>
      </View>
    );
  }
}

const style = StyleSheet.create({
    container: {        
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
});


StarButton.propTypes = {
  disabled: PropTypes.bool,
  rating: PropTypes.number,
  onStarButtonPress: PropTypes.func,  
  starIcon: PropTypes.element,
  starTitle: PropTypes.string,
  starTitleStyle: Text.propTypes.style
};

export default StarButton;
