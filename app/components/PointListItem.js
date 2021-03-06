import React, { Component, PropTypes } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Touchable from './common/Touchable';
import moment from 'moment';
import ptBr from 'moment/locale/pt-br';


/**
 * Componente chamado pelo PointList para renderizar cada ponto batido
 */
class PointListItem extends Component {

  _onViewPress() {
    this.context.onViewPress && this.context.onViewPress(this.props.point)
  }

  _onEditPress() {
    this.context.onEditPress && this.context.onEditPress(this.props.point)
  }

  _onLocationPress() {
    this.context.onLocationPress && this.context.onLocationPress(this.props.point)
  }

  /**
   * Renderiza o componente
   * @return {ReactElement}
   */
  render() {
    // pega a hora e o minuto do ponto
    let {hour, minute} = this.props.point;

    // formata usando o moment
    let time = moment({hour, minute}).format('HH:mm');

    // define o icone de acordo com o tipo de ponto (in/out)
    // let icon = `log-${this.props.point.pointType}`;
    let icon = 'fingerprint';

    // define o estilo do icone de acordo com o tipo de ponto (in/out)
    let iconStyle = this.props.point.pointType === 'in' ? styles.iconIn : styles.iconOut;

    // recebe estilo definido no props
    let style = this.props.style || {};
    let edited = this.props.point.edited ? '*': '';
    let job = this.props.point.job ? this.props.point.job.name : null;

    return (
      <View style={[styles.container, ...style]}>

        {/*Ĩcone*/}
        <View style={styles.fluxIconWrapper}>
          <Icon name={icon} style={[styles.icon, iconStyle]} />
        </View>

        {/*Hora*/}
        <View style={styles.timeWrapper}>
          <Text style={styles.time}>{time}{edited}</Text>
          <Text>{job}</Text>
        </View>

        {/*Botões*/}
        <View style={styles.buttonsGroupWrapper}>

          {/*botão de localização*/}
          <Touchable
            onPress={this._onLocationPress.bind(this)}
          >
            <View style={styles.button}>
              <Icon
                name="my-location"
                style={[styles.icon, styles.iconLocation]} />
            </View>
          </Touchable>

          {/*botão de editar*/}
          <Touchable
            onPress={this._onEditPress.bind(this)}
          >
            <View style={styles.button}>
              <Icon name="edit" style={styles.icon} />
            </View>
          </Touchable>

          {/*Botão de visualização*/}
          <Touchable
            onPress={this._onViewPress.bind(this)}
          >
            <View style={styles.button}>
              <Icon name="remove-red-eye" style={styles.icon} />
            </View>
          </Touchable>
        </View>
      </View>
    );
  }
}

// Props do componente
PointListItem.propTypes = {
  point: PropTypes.object.isRequired
}

PointListItem.contextTypes = {
  onEditPress: PropTypes.func,
  onViewPress: PropTypes.func,
  onLocationPress: PropTypes.func,
}

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },
  icon: {
    fontSize: 20
  },
  fluxIconWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  iconIn: {
    color: 'green'
  },
  iconOut: {
    color: 'red'
  },

  timeWrapper: {
    flex: 5,
    paddingHorizontal: 5
  },
  time: {
    fontSize: 20
  },

  buttonsGroupWrapper: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:50,
    backgroundColor: 'rgba(170, 180, 182, 0.64)'
  },
  iconLocation: {
    color: 'red'
  }
});

export default PointListItem;
