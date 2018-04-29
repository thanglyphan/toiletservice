import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  ListView,
  WebView,
  Image,
  LayoutAnimation
} from 'react-native'
import Header from '../header/Header'
import { styles } from './Style'
import ToiletCard from '../toiletcard/ToiletCard'
import content from '../../mockups/toiletService.json'
import { toilet } from '../../actions/toilet'
import { Distance } from '../../assets/DataConverter'
import color from '../../assets/color'

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
})

class Main extends Component {
  static navigationOptions = {
    gesturesEnabled: false
  }
  constructor(props) {
    super(props)
    this.state = {
      dataSource: ds.cloneWithRows([])
    }
  }

  componentDidMount() {
    this.setState({
      dataSource: ds.cloneWithRows(content.entries)
    })
  }

  navigateToMap = data => {
    const { navigate } = this.props.navigation
    navigate('Map')
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <ListView
          style={{ paddingTop: 10 }}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(rowData, rowId, sectionId) => (
            <ToiletCard
              data={rowData}
              color={'gray'}
              sectionId={sectionId}
              lastLat={this.props.region.latitude}
              lastLong={this.props.region.longitude}
              navigate={data => this.navigateToMap(data)}
              navigation={this.props.navigation}
            />
          )}
        />
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    region: state.location.region
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onEvent: data => {
      dispatch(event(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
