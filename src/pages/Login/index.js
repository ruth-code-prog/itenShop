import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, Button} from 'react-native';
import {Ilustrasi, Logo} from '../../assets';
import {Input, Jarak, Tombol} from '../../components';
import {colors, fonts, responsiveHeight} from '../../utils';
import {loginUser} from '../../actions/AuthAction';
import {connect} from 'react-redux';
import Daftar from '../Daftar';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  login = () => {
    const {email, password} = this.state;

    if (email && password) {
      //action
      this.props.dispatch(loginUser(email, password));
    } else {
      Alert.alert('Error', 'Email & Password harus diisi');
    }
  };

  componentDidUpdate(prevProps) {
    const {loginResult} = this.props;

    if (loginResult && prevProps.loginResult !== loginResult) {
      this.props.navigation.replace('MainApp');
    }
  }

  render() {
    const {email, password} = this.state;
    const {loginLoading} = this.props;

    return (
      <View style={styles.pages}>
        <View style={styles.logo}>
          <Logo />
        </View>
        <View style={styles.cardLogin}>
          <Input
            label="Email"
            placeholder="Masukkan Email"
            value={email}
            onChangeText={(email) => this.setState({email})}
          />
          <Input
            label="Password"
            placeholder="Masukkan password"
            secureTextEntry
            value={password}
            onChangeText={(password) => this.setState({password})}
          />
          <Jarak height={25} />
          <Tombol
            title="Masuk"
            type="text"
            padding={12}
            fontSize={18}
            loading={loginLoading}
            onPress={() => this.login()}
          />
        </View>

        <View style={styles.register}>
          <Text style={styles.textBlue}>Belum Punya Akun ?</Text>
          <Daftar />
        </View>

        <View style={styles.ilustrasi}>
          
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  loginLoading: state.AuthReducer.loginLoading,
  loginResult: state.AuthReducer.loginResult,
  loginError: state.AuthReducer.loginError,
});

export default connect(mapStateToProps, null)(Login);

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white,
  },
  ilustrasi: {
    position: 'absolute',
    bottom: 0,
    right: -100,
  },
  logo: {
    alignItems: 'center',
    marginTop: responsiveHeight(70),
  },
  cardLogin: {
    backgroundColor: colors.yellow4,
    marginHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    padding: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  register: {
    alignItems: 'center',
    marginTop: 16,
  },
  textBlue: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
    color: colors.primary,
  },
});
