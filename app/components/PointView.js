import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

import moment from 'moment';

import Header from './common/Header';
import Color from '../resource/color';
import MapView from 'react-native-maps';


class PointView extends Component {
  constructor(props) {
    super(props);
    this.pointOptions = {
      in: {
        title: 'Entrada',
        style: styles.headerIn,
        color: '#1abc9c'
      },
      out: {
        title: 'Saída',
        style: styles.headerOut,
        color: '#ff004c'
      }
    };
  }

  render() {

    const {
      hour,
      minute,
      pointType,
      date,
      location,
      picture
    } = this.props.route.point;
    const headerTitle = this.pointOptions[pointType] ? this.pointOptions[pointType].title : 'Ponto';
    const headerStyle = this.pointOptions[pointType] ? this.pointOptions[pointType].style : styles.header;
    const statusBarColor = this.pointOptions[pointType] ? this.pointOptions[pointType].color : '#303F9F';
    const momentDate = moment(date, 'YYYY/MM/DD').hour(hour).minute(minute);
    const pointDate = momentDate.format('DD/MM/YYYY');
    const pointHour = momentDate.format('HH:mm');

    // Gera o base64 da imagem
    let base64string = `data:${picture.type};base64,${picture.data}`;
    // precarrega a imagem
    // let prefetchTask = Image.prefetch(base64string);

    const region = {
      ...location,
      latitudeDelta: 0.03,
      longitudeDelta: 0.03
    }
    return (
      <ScrollView style={styles.container}>
        <StatusBar
          backgroundColor={statusBarColor}
          barStyle="light-content"
        />
        <Header
          style={headerStyle}
          title={headerTitle}
          leftItem={{
            layout: 'icon',
            title: 'Close',
            icon: require('./common/BackButtonIcon'),
            onPress: () => this.props.navigator.pop()
          }} />
        <View style={[styles.imageWrapper]}>
          <Image
            source={{
              uri: base64string,
              isStatic: true
            }}
            style={styles.image}
            resizeMode="stretch"
          >
            <View style={styles.imageTitleWrapper}>
              <Text style={[styles.imageText, styles.dateText]}>{pointDate}</Text>
              <Text style={[styles.imageText, styles.hourText]}>{pointHour}</Text>
            </View>
          </Image>
        </View>
        <View style={styles.pointDetailContainer}>


        {/*MapView da biblioteca*/}
          <MapView initialRegion={region} style={styles.map}>
            <MapView.Marker coordinate={location} title="ponto" description="Entrada"/>
          </MapView>
        </View>
      </ScrollView>
    );
  }
}

PointView.PropTypes = {
  point: PropTypes.object.isRequired
}

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25;
const HEADER_HEIGHT = Platform.OS === 'ios' ? 44 + STATUS_BAR_HEIGHT : 56 + STATUS_BAR_HEIGHT;
const {height, width} = Dimensions.get('window');
const HALF_SCREEN_HEIGHT= (height - HEADER_HEIGHT) / 2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  header: {
    backgroundColor: Color.color.PrimaryColor,
  },
  headerIn: {
    backgroundColor: '#1abc9c',
  },
  headerOut: {
    backgroundColor: '#ff004c',
  },
  card: {
    margin: 5,
    elevation: 2
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: HALF_SCREEN_HEIGHT,
    backgroundColor: Color.color.LightPrimaryColor
  },
  image: {
    height: HALF_SCREEN_HEIGHT,
    justifyContent: 'flex-end',
    paddingHorizontal: 10
  },
  imageTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: 10
  },
  imageText: {
    color: 'white',
    marginRight: 5
  },
  dateText: {
    fontSize: 30,
    fontWeight: '500'
  },
  hourText: {
    fontSize: 15,
    fontWeight: '500',
    paddingVertical: 2
  },
  pointDetailContainer: {
    height: HALF_SCREEN_HEIGHT,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

export default PointView;
