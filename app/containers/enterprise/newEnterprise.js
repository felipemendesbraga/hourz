'use strict';

import React, {
  Component
} from 'react';

import {
  Text,
  TextInput,
  ToastAndroid,
  ToolbarAndroid,
  View
} from 'react-native';

import {
  connect
}  from 'react-redux';

import {
  cleanSaved,
  createEnterprise
} from '../../actions/enterprise';

import ProgressBar              from '../../components/common/ProgressBar';
import * as HBStyleSheet        from '../../components/common/HBStyleSheet';
import Header                   from '../../components/common/Header';
import TextButton               from '../../components/common/TextButton';
import BackButtonIcon           from '../../components/common/BackButtonIcon';
import Color                    from '../../resource/color';

class newEnterprise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: '',
            name: '',
            user: '',
            errorMessage: '',
            saved: false,
            isFetching: false
        };
        this.onPress = this.onPress.bind(this);
    }


    /**
     * Component Lifecycle Method
     * @param  {any} prevProps -> props antes das alterações
     * @param  {any} prevState -> state antes das alterações
     * @return {void}
     */
    componentDidUpdate(prevProps, prevState) {

      // Se o dia atual foi alterado, carrega os pontos novamente
      if(prevProps.enterprises.saved !== this.props.enterprises.saved  && this.props.enterprises.saved === true) {
        this.props.cleanSaved();
        this.props.navigator.pop();
      }
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.user.error) {
        this.setState({
          errorMessage: nextProps.user.error
        });
      }
      this.setState({
        isFetching: nextProps.fetchData.isFetching
      });
    }

    onPress() {

        let enterprise = {
          name: this.state.name,
          owner: this.props.user.id
        };

        this.setState({
          isFetching: true
        });

        this.props.createEnterprise(enterprise);
    }

    dismiss() {
      this.props.navigator.pop();
    }

    render() {
      if(this.state.isFetching) {
        return (
          <ProgressBar text={this.props.fetchData.message} />
        )
      }
        return (
            <View style={styles.container}>

              <Header
                style={styles.header}
                title="Empresa nova"
                leftItem={{
                  layout: 'icon',
                  title: 'Close',
                  icon: require('../../components/common/BackButtonIcon'),
                  onPress: this.dismiss.bind(this),
                }}>
              </Header>


              <View style={styles.body}>
                <Text style={styles.label}>Nome:</Text>
                <TextInput
                  style={styles.input}
                  value={this.state.name}
                  onChangeText={(text) => this.setState({name: text})} />

                <Text style={styles.msgError}>{this.state.errorMessage}</Text>

                <View style={styles.buttonSubmitWrapper}>
                  <TextButton
                    style={styles.buttonSubmit}
                    textStyle={styles.buttonSubmitText}
                    title="CADASTRAR"
                    onPress={this.onPress}
                  />
                </View>

              </View>

            </View>
        )
    }

  }

var styles = HBStyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    android: {
      backgroundColor: Color.color.PrimaryColor,
    },
  },
  title: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  body: {
      flex: 1,
      justifyContent: 'center',
      width: 300,
      alignSelf: 'center',
      padding: 8
  },
  input: {
      padding: 4,
      height: 40,
      width: 300,
      borderColor: 'gray',
      margin: 5,
      alignSelf: 'center'
  },
  label: {
      fontSize: 18,
      alignSelf: 'flex-start',
      marginLeft: 5
  },
  buttonSignin: {
    width: 290
  },
  buttonSubmitWrapper: {
    marginTop: 20,
    alignSelf: 'center',
    width: 290
  },

  buttonSubmit: {
    backgroundColor: 'blue',
    marginTop: 20,
    width: 290
  },
  buttonSubmitText: {
    color: 'white'
  },
  divider: {
    marginTop: 5,

  },
  toolbar: {
    height: 56,
    backgroundColor: Color.color.PrimaryColor
  },
  msgError: {
    color: 'red',
    fontSize: 15,
    alignSelf: 'center'
  }

});

function mapStateToProps(state) {
    return {
      user: state.user,
      enterprises: state.enterpriseReducer,
      fetchData: state.fetchData
    };
}

function mapDispatchToProps(dispatch) {
  return {
    cleanSaved: () => dispatch(cleanSaved()),
    createEnterprise: (enterprise) => dispatch(createEnterprise(enterprise))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(newEnterprise);
