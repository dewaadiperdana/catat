import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    Dimensions,
    AsyncStorage,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spinner from 'react-native-loading-spinner-overlay';

import { Link, Redirect, withRouter } from 'react-router-native';

import { HeaderOne } from '../Header';
import { Button } from '../Buttons';
import { ButtonIcon } from '../Common';
import { BASE_URL } from "../config";

import axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                nama: '',
                email: '',
                password: ''
            },
            password: {
                isHide: true,
            },
            redirect: false,
            loading: false,
            errors: []
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

    onRegister = () => {
        this.setState({ loading: true });

        axios.post(`${BASE_URL}api/users/register`, this.state.form)
            .then(response => {
                AsyncStorage.setItem('token', response.token);
                this.setState({ redirect: true, loading: false });
            })
            .catch(error => this.setState({
                redirect: false,
                loading: false,
                errors: error.response.data.errors 
            }));
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

    render() {
        if(this.state.redirect) {
            return(
                <Redirect to="/dashboard" />
            );
        }

        const {
            registerContainer,
            registerTitle,
            registerFormContainer,
            registerFormGroup,
            registerFormInput,
            registerFormFooter,
            registerFormFooterCol,
            registerFormFooterText,
            registerFormLoginText,
            registerFormErrorText,
            loadingTextStyle,
            showOrHidePasswordBtn
        } = styles;

        const { height } = Dimensions.get('window');
        const { errors, password } = this.state;

        const namaErrorText = ('nama' in errors) ? (
            <Text style={registerFormErrorText}>{errors.nama}</Text>
        ) : null;

        const emailErrorText = ('email' in errors) ? (
            <Text style={registerFormErrorText}>{errors.email}</Text>
        ) : null;

        const passwordErrorText = ('password' in errors) ? (
            <Text style={registerFormErrorText}>{errors.password}</Text>
        ) : null;

        return(
            <View style={{ height: height }}>
                <Spinner
                    visible={this.state.loading}
                    textContent={'Loading...'}
                    overlayColor="rgba(0, 0, 0, 0.5)"
                    textStyle={loadingTextStyle}
                    animation="fade" />

                <HeaderOne />

                <KeyboardAwareScrollView>
                    <View style={registerContainer}>
                        <Text style={registerTitle}>Register</Text>
                        <View style={registerFormContainer}>
                            <View style={registerFormGroup}>
                                <TextInput 
                                    style={registerFormInput}
                                    placeholder="Nama"
                                    onChangeText={(text) => this.handleChangeText(text, 'nama')}
                                />
                                {namaErrorText}
                            </View>
                            <View style={registerFormGroup}>
                                <TextInput
                                    textContentType="none"
                                    style={registerFormInput}
                                    placeholder="Email"
                                    autoCorrect={false}
                                    onChangeText={(text) => this.handleChangeText(text, 'email')}
                                />
                                {emailErrorText}
                            </View>
                            <View style={registerFormGroup}>
                                <TextInput 
                                    style={registerFormInput} 
                                    placeholder="Password"
                                    secureTextEntry={password.isHide}
                                    onChangeText={(text) => this.handleChangeText(text, 'password')}
                                />
                                <ButtonIcon 
                                    style={showOrHidePasswordBtn}
                                    icon={password.isHide ? 'eye' : 'eye-slash'}
                                    action={this.hideOrShowPassword} />
                                {passwordErrorText}
                            </View>
                            <View style={registerFormFooter}>
                                <Button 
                                    text="Register"
                                    style="primary"
                                    handle={this.onRegister}
                                />
                                <View style={[registerFormFooterCol, registerFormFooterText]}>
                                    <Text>Sudah punya akun? </Text>
                                    <Link to="/" underlayColor={null}>
                                        <Text style={registerFormLoginText}>Login</Text>
                                    </Link>
                                </View>
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

export default withRouter(Register);

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    registerContainer: {
        paddingLeft: 25,
        paddingRight: 25,
        height: height
    },
    registerTitle: {
        fontFamily: 'poppins-bold',
        fontSize: 30,
        textAlign: 'center'
    },
    registerFormContainer: {
        marginTop: 30,
        height: height - 300
    },
    registerFormGroup: {
        marginBottom: 30
    },
    registerFormInput: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#DCDCDC',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        fontFamily: 'poppins-regular'
    },
    registerFormFooter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    registerFormFooterCol: {
        alignSelf: 'center'
    },
    registerFormFooterText: {
        fontFamily: 'poppins-regular',
        display: 'flex',
        flexDirection: 'row'
    },
    registerFormLoginText: {
        color: '#0984E3',
        borderBottomWidth: 2,
        borderColor: '#0984E3',
        alignSelf: 'flex-start'
    },
    registerFormErrorText: {
        fontFamily: 'poppins-regular',
        fontSize: 12,
        color: '#d63031',
        marginTop: 5
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