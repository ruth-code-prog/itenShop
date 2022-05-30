import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {HeaderComponent, ListJerseys, ListLiga} from '../../components';
import {colors, fonts} from '../../utils';
import {Jarak} from '../../components';
import {connect} from 'react-redux';
import {getListJersey} from '../../actions/JerseyAction';
import {getListLiga} from '../../actions/LigaAction';
import Headline from '../Headline';

class ListJersey extends Component {
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      const {idLiga, keyword} = this.props;
      this.props.dispatch(getListLiga());
      this.props.dispatch(getListJersey(idLiga, keyword));
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  componentDidUpdate(prevProps) {
    const {idLiga, keyword} = this.props;

    if (idLiga && prevProps.idLiga !== idLiga) {
      this.props.dispatch(getListJersey(idLiga, keyword));
    }

    if (keyword && prevProps.keyword !== keyword) {
      this.props.dispatch(getListJersey(idLiga, keyword));
    }
  }

  render() {
    const {navigation, namaLiga, keyword} = this.props;

    return (
      <View style={styles.page}>
        <HeaderComponent navigation={navigation} page="ListJersey" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          <View style={styles.pilihLiga}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <ListLiga navigation={navigation} />
            </ScrollView>
            <Headline />
          </View>

          <View style={styles.pilihJersey}>
            {keyword ? (
              <Text style={styles.label}>
                Cari : <Text style={styles.boldLabel}>{keyword}</Text>
              </Text>
            ) : (
              <Text style={styles.label}>
                Pilih <Text style={styles.boldLabel}>Produk </Text>
                {namaLiga ? namaLiga : 'Yang Anda Inginkan'}
              </Text>
            )}

            <ListJerseys navigation={navigation} />
          </View>

          <Jarak height={100} />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  idLiga: state.JerseyReducer.idLiga,
  namaLiga: state.JerseyReducer.namaLiga,
  keyword: state.JerseyReducer.keyword,
});

export default connect(mapStateToProps, null)(ListJersey);

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: colors.biru},
  container: {
    marginTop: -30,
  },
  pilihLiga: {
    marginHorizontal: 30,
  },
  pilihJersey: {
    marginHorizontal: 30,
    marginTop: 10,
    color:"#FFFFFF",
  },
  label: {
    fontSize: 18,
    color:"#FFFFFF",
  },
  boldLabel: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
    color:"#FFFFFF",
  },
});
