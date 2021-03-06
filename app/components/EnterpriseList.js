import React, { Component, PropTypes } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import EnterpriseItem from './EnterpriseItem';

/**
 * Lista de pontos batidos
 */
class EnterpriseList extends Component {

  /**
   * construtor do component
   * @param  {Object} props
   * @return {void}
   */
  constructor(props) {
    super(props);

    // dataSource -> lista de pontos
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource
    }
  }

  /**
   * Component Lifecycle Method
   * @return {void}
   */
  componentDidMount() {
    // popula o dataSource com os pontos
    this.setState({
      dataSource : this.state.dataSource.cloneWithRows(this.props.enterprises)
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      dataSource : this.state.dataSource.cloneWithRows(newProps.enterprises)
    });
  }

  /**
   * renderiza a linha do listView
   * @param  {object} enterprise -> ponto
   * @param  {number} idSec -> id da sequência
   * @param  {number} idRow -> id da linha
   * @return {ReactElement} EnterpriseItem
   */
  renderRow(enterprise, idSec, idRow) {
    return (
      <EnterpriseItem key={enterprise.key} enterprise={enterprise} />
    );
  }

  /**
   * renderiza a lista de pontos
   * @return {ReactElement}
   */
  renderPointList() {

      // caso não tenha ponto, retorna a mensagem
      if(this.props.enterprises.length === 0) {
        return (
          <View
            style={[styles.empty]}
          >
            <Text style={{fontSize: 20}}>
              Você ainda não possui uma empresa.
            </Text>
          </View>
        );
      }

      // retorna a ListView
      return (
        <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
            style={styles.listView}
            //renderSeparator={(secId, rowId) => (
            //  <View
            //  style={{
            //    borderWidth:2,
            //    borderColor: '#424242'
            //  }} />
            //)}
          />
      );
  }

  /**
   * Renderiza o componente
   * @return {ReactElement}
   */
  render() {
    return (
      <View style={styles.container}>
        {this.renderPointList()}
      </View>
    );
  }
}

// Props do componente
EnterpriseList.propTypes = {
  enterprises: PropTypes.array.isRequired
}

// Estilo do componente
var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    empty: {
      flex: 1,
      justifyContent: 'center',
      alignSelf: 'center'

    },
    listView: {
      backgroundColor: '#F5FCFF'
    }
});

export default EnterpriseList;
