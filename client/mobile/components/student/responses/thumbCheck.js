var React = require('react-native');
var Slider = require('react-native-slider');
var ThumbRoll = require('./thumbRoll');

var {
  View,
  Text,
  StyleSheet,
  ScrollView,
} = React;

class ThumbCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      pollInfo: this.props.route.pollInfo,
      socket: this.props.route.socket,
      user: this.props.route.user,
    }
    this.state.socket.on('closePoll', function(data) {
      this.state.socket.removeListener('closePoll');
      this.props.navigator.pop();
    }.bind(this));
  }

  submitResponse() {
    console.log('Student',this.state.userId,'answered',this.state.value,'to poll',this.state.pollInfo.pollId);
    this.state.socket.emit('studentResponse', {
      user: this.state.user,
      answer: this.state.value,
      pollId: this.state.pollInfo.pollId
    })
    this.state.socket.removeListener('closePoll');
    this.props.navigator.pop();
  }

  valueChange(value) {
    this.setState({value: Math.floor(value)})
  }
  
  render() {
    return (
      <View style={styles.sceneContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text> Enter Percentage </Text>
          </View>
          <View style={styles.bodyContainer}>
            <View style={styles.thumbRollContainer}>
              <ThumbRoll onUpdate={(value)=>{this.valueChange(value);}}/>
            </View>
            <View>
              <Text onPress={this.submitResponse.bind(this)}>Submit</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  sceneContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#6ECFBF',
    // justifyContent: 'flex-start'
  },
  contentContainer: {
    marginTop: 20,
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  titleContainer: {
    alignItems: 'center',
  },
  bodyContainer: {
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center'
  },
  thumbRollContainer: {
    alignItems: 'stretch',
  },
})

var customStyles = StyleSheet.create({
  track: {
      height: 4,
      borderRadius: 2,
    },
    thumb: {
      width: 30,
      height: 30,
      borderRadius: 30 / 2,
      backgroundColor: 'white',
      borderColor: '#30a935',
      borderWidth: 2,
    }
})

module.exports = ThumbCheck;
