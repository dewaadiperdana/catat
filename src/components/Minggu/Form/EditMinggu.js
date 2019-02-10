import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
    ToastAndroid,
    AsyncStorage
} from 'react-native';

import axios from 'axios';

import Spinner from 'react-native-loading-spinner-overlay';

import { BASE_URL, AUTH_TOKEN, AUTH_USER } from '../../config';

import { HeaderOne } from '../../Header';
import { Button } from '../../Buttons';

export class EditMinggu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            loading: false,
            token: null,
            form: {
                uang_belanja: '',
                catatan: ''
            },
            errors: []
        };
    }

    async componentDidMount() {
        this.setState({ loading: true });

        const { match } = this.props;

        try {
            let user = await AsyncStorage.getItem(AUTH_USER);
            let token = await AsyncStorage.getItem(AUTH_TOKEN);

            let response = await axios.get(`${BASE_URL}api/minggu/detail/${match.params.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            this.setState({
                loading: false,
                user: JSON.parse(user), 
                token: token,
                form: response.data.minggu
            });
        } catch(error) {
            this.setState({ loading: false });
            console.log(error);
        }
    }

    onSimpan = async () => {
        this.setState({ loading: true });

        const { match, history } = this.props;
        const { uang_belanja, catatan } = this.state.form;
        let data = {
            id_user: this.state.user.id,
            uang_belanja: uang_belanja,
            catatan: catatan
        };

        try {
            let response = await axios.put(`${BASE_URL}api/minggu/${match.params.id}`, data, {
                headers: {
                    'Authorization': `Bearer ${this.state.token}`
                }
            })
            
            this.setState({ loading: false });
            history.push(`/minggu/detail/${match.params.id}`);
            ToastAndroid.show('Data minggu berhasil di edit', ToastAndroid.SHORT);
        } catch (error) {
            this.setState({ loading: false });
            this.setState({ errors: error.response.data.errors });
        }
    }

    handleChangeText = (key, text) => {
        this.setState({
            form: {
                ...this.state.form,
                [key]: text
            }
        });
    }

    render() {
        const { 
            centerTitle,
            container,
            formContainer,
            formGroup,
            formInput,
            formSubmitBtn,
            loadingTextStyle,
            errorText
        } = styles;

        const { match } = this.props;
        const { errors, form } = this.state;

        const uangBelanjaError = ('uang_belanja' in errors) ? (
            <Text style={errorText}>{errors.uang_belanja[0]}</Text>
        ) : null;

        return(
            <View>
                <Spinner
                    visible={this.state.loading}
                    textContent={'Loading...'}
                    overlayColor="rgba(0, 0, 0, 0.5)"
                    textStyle={loadingTextStyle}
                    animation="fade" />

                <HeaderOne topBtn={true} topBtnLink={`/minggu/detail/${match.params.id}`} />
                <View style={container}>
                    <Text style={centerTitle}>Edit Minggu</Text>
                    <KeyboardAvoidingView style={formContainer} behavior="position" enabled>
                            <View style={formGroup}>
                                <TextInput
                                    style={formInput} 
                                    placeholder="Uang belanja"
                                    onChangeText={text => this.handleChangeText('uang_belanja', text)}
                                    value={form.uang_belanja} />
                                    {uangBelanjaError}
                            </View>
                            <View style={formGroup}>
                                <TextInput 
                                    style={formInput} 
                                    multiline={true}
                                    numberOfLines={7}
                                    placeholder="Catatan (optional)"
                                    onChangeText={text => this.handleChangeText('catatan', text)}
                                    value={form.catatan} />
                            </View>
                    </KeyboardAvoidingView>
                    <View style={formGroup}>
                        <Button
                            text="Simpan"
                            style="primary"
                            handle={this.onSimpan}
                            optionalStyle={formSubmitBtn}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 25,
        paddingRight: 25,
    },
    centerTitle: {
        fontFamily: 'poppins-bold',
        fontSize: 20,
        textAlign: 'center'
    },
    formContainer: {
        marginTop: 30,
    },
    formGroup: {
        marginBottom: 25
    },
    formInput: {
        fontFamily: 'poppins-regular',
        borderWidth: 1,
        borderColor: '#DCDCDC',
        borderRadius: 5,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10
    },
    formInputArea: {
        height: 170,
        alignSelf: 'flex-start'
    },
    formSubmitBtn: {
        alignSelf: 'flex-start'
    },
    loadingTextStyle: {
        fontFamily: 'poppins-regular',
        fontSize: 14,
        color: 'white'
    },
    errorText: {
        fontFamily: 'poppins-regular',
        color: '#e74c3c',
        fontSize: 13
    },
});