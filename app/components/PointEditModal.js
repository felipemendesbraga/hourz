import React, { Component, PropTypes } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View
} from 'react-native';
import Color from '../resource/color'; //Importa a palheta de cores
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import Button from './common/button';

/**
 * Componente que abre um modal para visualizar a imagem do ponto registrado
 *
 */
class PointEditModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      observation: '',
    }

    this.close = this.close.bind(this);
  }

  close(point, observation) {
    this.setState({
      observation: ''
    });
    this.props.onRequestClose(point, observation);
  }

  onPress() {
    if(!this.state.observation) {
      ToastAndroid.show('Campo Obrigatório', ToastAndroid.LONG);
      return;
    }
    this.close(this.props.point, this.state.observation);

  }

  /**
   * Renderiza o componente
   * @return {ReactElement}
   */
  render() {

    return (
      <Modal
        ref="modal"
        animationType="fade"
        transparent={true}
        visible={this.props.isVisible}
        onRequestClose={() => this.close()}
      >
        <View style={styles.container}>
          <View style={[styles.innerContainer]}>
            <TextInput
              autoFocus={true}
              multiline={true}
              numberOfLines={3}
              placeholder="Observação"
              style={styles.input}
              value={this.state.observation}
              onChangeText={(text) => this.setState({observation: text})}
            />
            <View style={styles.buttonWrapper}>
              <Button style={styles.button} onPress={this.onPress.bind(this)}>
                <Icon name="send" style={styles.buttonIcon} />
              </Button>
            </View>
          </View>
        </View>

      </Modal>
    );
  }
}

// Props do componente
PointEditModal.propTypes = {
  point: PropTypes.shape({
    type: PropTypes.string,
    location: PropTypes.object,
    date: PropTypes.string,
    hour: PropTypes.number,
    minute: PropTypes.number,
    picture: PropTypes.shape({
      uri: PropTypes.string,
      isStatic: PropTypes.bool
    })
  }),
  isVisible: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

// Valor inicial dos props
PointEditModal.defaultProps = {
  isVisible: false
}

// Estilo do componente
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(154, 154, 154, 0.55)',
    padding: 20
  },
  innerContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20
  },
  input: {
      flex: 4,
      padding: 4,
      height: 100,
      borderColor: 'gray',
      alignSelf: 'center'
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  button: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: Color.color.AccentColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonIcon: {
    fontSize: 28,
    color: 'white'
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
  },
  rowTitle: {
    flex: 1,
    fontWeight: 'bold',
  }
});

export default PointEditModal;
