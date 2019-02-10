import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Dimensions,
    StyleSheet,
    TextInput,
    AsyncStorage,
} from 'react-native';

import axios from 'axios';

import Spinner from 'react-native-loading-spinner-overlay';
import { Link, withRouter } from 'react-router-native';

import { BASE_URL, AUTH_TOKEN, AUTH_USER } from '../config';
import { HeaderOne } from '../Header';
import { Button } from '../Buttons';
import { ButtonIcon } from '../Common';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                email: '',
                password: ''
            },
            loading: false,
            errors: {
                email: [],
                password: [],
                message: []
            },
            password: {
                isHide: true,
            }
        };
    }

    handleChangeText = (text, state) => {
        this.setState({
            form: {
                ...this.state.form,
                [state]: text
            }
        });
    }

    async componentDidMount() {
        let token = await AsyncStorage.getItem(AUTH_TOKEN);

        if(token) {
            this.setState({ loading: true });
            
            const { history } = this.props;

            let header = {
                'Authorization': `Bearer ${token}`
            };

            try {
                let response = await axios.post(`${BASE_URL}api/users/is-authenticated`, {}, { headers: header });
                
                this.setState({ loading: false });
                await AsyncStorage.setItem(AUTH_USER, JSON.stringify(response.data.user));
                await AsyncStorage.setItem(AUTH_TOKEN, token);
                
                history.push('/dashboard');
            } catch(error) {
                this.setState({ loading: false });

                console.log(error);
            }
        }
    }

    hideOrShowPassword = () => {
        const { isHide } = this.state.password;

        if(isHide === true) {
            this.setState({
                password: {
                    isHide: false
                }
            });
        } else {
            this.setState({
                password: {
                    isHide: true
                }
            });
        }
    }

    onLogin = () => {
        const { history } = this.props;

        this.setState({ loading: true });

        axios.post(`${BASE_URL}api/users/authenticate`, this.state.form)
            .then(async response => {
                this.setState({ loading: false });
                await AsyncStorage.setItem(AUTH_TOKEN, response.data.token);
                await AsyncStorage.setItem(AUTH_USER, JSON.stringify(response.data.user));

                history.push('/dashboard');
            }).catch(error => {
                this.setState({
                    loading: false,
                    errors: error.response.data.errors
                });

                console.log(this.state.errors);
            });
    }

    render() {
        const {
            loginContainer,
            loginTitle,
            loginFormContainer,
            loginFormFooter,
            loginFormFooterCol,
            loginFormFooterText,
            loginFormGroup,
            loginFormInput,
            loginFormRegisterText,
            errorText,
            loadingTextStyle,
            keyboardDidShowStyle,
            showOrHidePasswordBtn
        } = styles;

        const emailMessage = ('email' in this.state.errors) ? (
            <Text style={errorText}>{this.state.errors.email[0]}</Text>
        ) : null;

        const passwordMessage = ('password' in this.state.errors) ? (
            <Text style={errorText}>{this.state.errors.password[0]}</Text>
        ) : null;

        const errorMessage = ('message' in this.state.errors) ? (
            <Text style={errorText}>{this.state.errors.message[0]}</Text>
        ) : null;

        const { password } = this.state;

        return(
            <View>
                <Spinner
                    visible={this.state.loading}
                    textContent={'Loading...'}
                    overlayColor="rgba(0, 0, 0, 0.5)"
                    textStyle={loadingTextStyle}
                    animation="fade" />

                <HeaderOne />

                <View style={loginContainer}>
                    <Text style={loginTitle}>Login</Text>
                    <View style={loginFormContainer}>
                        <View style={loginFormGroup}>
                            <TextInput
                                textContentType="none"
                                style={loginFormInput}
                                placeholder="Email"
                                onChangeText={(text) => this.handleChangeText(text, 'email')}
                            />
                            {emailMessage}
                        </View>
                        <View style={loginFormGroup}>
                            <TextInput 
                                style={loginFormInput} 
                                placeholder="Password"
                                secureTextEntry={password.isHide}
                                onChangeText={(text) => this.handleChangeText(text, 'password')}
                            />
                            <ButtonIcon 
                                style={showOrHidePasswordBtn}
                                icon={password.isHide ? 'eye' : 'eye-slash'}
                                action={this.hideOrShowPassword} />
                            {passwordMessage}
                        </View>
                        {errorMessage}
                    </View>
                    <View style={loginFormContainer}>
                        <View style={loginFormFooter}>
                            <Button 
                                text="Login"
                                style="primary"
                                handle={this.onLogin}
                            />
                            <View style={[loginFormFooterCol, loginFormFooterText]}>
                                <Text>Belum punya akun? </Text>
                                <Link to="/register" underlayColor={null}>
                                    <Text style={loginFormRegisterText}>Daftar</Text>
                                </Link>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default withRouter(Login);

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    loginContainer: {
        paddingLeft: 25,
        paddingRight: 25,
        height: (window.height - (window.height / window.scale)) - 65
    },
    keyboardDidShowStyle: {
        marginBottom: 0
    },
    loginTitle: {
        fontFamily: 'poppins-bold',
        fontSize: 30,
        textAlign: 'center'
    },
    loginFormContainer: {
        marginBottom: 0
    },
    loginFormGroup: {
        marginBottom: 20
    },
    loginFormInput: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#DCDCDC',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        fontFamily: 'poppins-regular'
    },
    loginFormFooter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    loginFormFooterCol: {
        alignSelf: 'center'
    },
    loginFormFooterText: {
        fontFamily: 'poppins-regular',
        display: 'flex',
        flexDirection: 'row'
    },
    loginFormRegisterText: {
        color: '#0984E3',
        borderBottomWidth: 2,
        borderColor: '#0984E3',
        alignSelf: 'flex-start'
    },
    errorText: {
        fontFamily: 'poppins-regular',
        color: '#e74c3c',
        fontSize: 13
    },
    loadingTextStyle: {
        fontFamily: 'poppins-regular',
        fontSize: 14,
        color: 'white'
    },
    showOrHidePasswordBtn: {
        position: 'absolute',
        right: 3,
        height: 40,
        width: 35,
        paddingVertical: 15,
    }
});