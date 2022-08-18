import React, {Component} from 'react';
import {Text, StyleSheet, View, Alert, Image, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {CardAlamat, Jarak, Pilihan, Tombol} from '../../components';
import {
  colors,
  fonts,
  getData,
  numberWithCommas,
  responsiveHeight,
} from '../../utils';
import {getKotaDetail, postOngkir} from '../../actions/RajaOngkirAction';
import {couriers} from '../../data';
import {snapTransactions} from '../../actions/PaymentActions';
import Qris from '../Qris';
import FIREBASE from '../../config/FIREBASE';

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: false,
      ekspedisi: couriers,
      ekspedisiSelected: false,
      ongkir: 0,
      estimasi: '',
      totalHarga: this.props.route.params.totalHarga,
      totalBerat: this.props.route.params.totalBerat,
      kota: '',
      provinsi: '',
      alamat: '',
      date: new Date().getTime(),
      additionalFee: {
        midtrans: 0,
      },
    };
  }

  componentDidMount() {
    this.getUserData();
    this.getAdditionalFee();
  }

  componentDidUpdate(prevProps) {
    const {getKotaDetailResult, ongkirResult, snapTransactionsResult} =
      this.props;

    if (
      getKotaDetailResult &&
      prevProps.getKotaDetailResult !== getKotaDetailResult
    ) {
      this.setState({
        provinsi: getKotaDetailResult.province,
        kota: getKotaDetailResult.type + ' ' + getKotaDetailResult.city_name,
      });
    }

    if (ongkirResult && prevProps.ongkirResult !== ongkirResult) {
      this.setState({
        ongkir: ongkirResult.cost[0].value,
        estimasi: ongkirResult.cost[0].etd,
      });
    }

    if (
      snapTransactionsResult &&
      prevProps.snapTransactionsResult !== snapTransactionsResult
    ) {
      const params = {
        url: snapTransactionsResult.redirect_url,
        ongkir: this.state.ongkir,
        estimasi: this.state.estimasi,
        order_id: 'MID-' + this.state.date + '-' + this.state.profile.uid,
      };

      this.props.navigation.navigate('Midtrans', params);
    }
  }

  getUserData = () => {
    getData('user').then(res => {
      const data = res;

      if (data) {
        this.setState({
          profile: data,
          alamat: data.alamat,
        });

        this.props.dispatch(getKotaDetail(data.kota));
      } else {
        this.props.navigation.replace('Login');
      }
    });
  };

  ubahEkspedisi = ekspedisiSelected => {
    if (ekspedisiSelected) {
      this.setState({
        ekspedisiSelected: ekspedisiSelected,
      });

      this.props.dispatch(postOngkir(this.state, ekspedisiSelected));
    }
  };

  getAdditionalFee = () => {
    FIREBASE.database()
      .ref('additional_fee')
      .once('value', snapshot => {
        const data = snapshot.val();
        this.setState({
          additionalFee: data,
        });
      });
  };

  Bayar = () => {
    const {totalHarga, ongkir, profile, date, additionalFee} = this.state;
    const {midtrans} = additionalFee || {};

    const data = {
      transaction_details: {
        order_id: 'MID-' + date + '-' + profile.uid,
        gross_amount: parseInt(totalHarga + ongkir + midtrans),
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: profile.nama,
        email: profile.email,
        phone: profile.nohp,
      },
    };
    this.props.dispatch(snapTransactions(data));
  };

  render() {
    const {
      ekspedisi,
      totalBerat,
      totalHarga,
      alamat,
      kota,
      provinsi,
      ekspedisiSelected,
      ongkir,
      estimasi,
      additionalFee,
    } = this.state;
    const {midtrans} = additionalFee || {};
    const {navigation, snapTransactionsLoading} = this.props;
    return (
      <View style={styles.pages}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.isi}>
            <Text style={styles.textBold}>Apakah Benar Alamat ini ?</Text>
            <CardAlamat
              alamat={alamat}
              provinsi={provinsi}
              kota={kota}
              navigation={navigation}
            />
          </View>
          <Jarak height={20} />
          <View style={styles.footer}>
            {/* Harga  */}
            <View style={styles.totalHarga}>
              <Text style={styles.textBold}>Harga :</Text>
              <Text selectable={true} style={styles.textBold}>
                Rp. {numberWithCommas(totalHarga + ongkir)}
              </Text>
            </View>
            <Jarak height={8} />
            {/* Midtrans  */}
            <View style={styles.totalHarga}>
              <Text style={styles.textBold}>+Midtrans fee :</Text>
              <Text selectable={true} style={styles.textBold}>
                Rp. {numberWithCommas(midtrans)}
              </Text>
            </View>
            <Jarak height={8} />
            {/* Total Harga  */}
            <View style={styles.totalHarga}>
              <Text style={styles.textBold}>Total Harga :</Text>
              <Text selectable={true} style={styles.textBold}>
                Rp. {numberWithCommas(totalHarga + ongkir + midtrans)}
              </Text>
            </View>
            <Jarak height={20} />
            <Tombol
              title="Bayar Via (Midtrans)"
              type="textIcon"
              fontSize={18}
              padding={responsiveHeight(15)}
              icon="keranjang-putih"
              onPress={() => this.Bayar()}
              loading={snapTransactionsLoading}
            />
            <Qris />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  getKotaDetailLoading: state.RajaOngkirReducer.getKotaDetailLoading,
  getKotaDetailResult: state.RajaOngkirReducer.getKotaDetailResult,
  getKotaDetailError: state.RajaOngkirReducer.getKotaDetailError,

  ongkirResult: state.RajaOngkirReducer.ongkirResult,

  snapTransactionsResult: state.PaymentReducer.snapTransactionsResult,
  snapTransactionsLoading: state.PaymentReducer.snapTransactionsLoading,
});

export default connect(mapStateToProps, null)(Checkout);

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.biru,
    paddingTop: 16,
    justifyContent: 'space-between',
  },
  isi: {
    paddingHorizontal: 30,
  },
  textBold: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
    color: '#FFFFFF',
  },
  textQRIS: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    fontFamily: fonts.primary.regular,
    color: '#FFFFFF',
  },
  totalHarga: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#FFFFFF',
  },
  ongkir: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#FFFFFF',
  },
  footer: {
    paddingHorizontal: 30,
    backgroundColor: colors.biru,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 11,
    paddingBottom: 30,
  },
});