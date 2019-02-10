import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
    Dimensions,
    DatePickerAndroid,
    Keyboard,
    AsyncStorage,
    ScrollView,
    ToastAndroid
} from 'react-native';

import axios from 'axios';
import moment from 'moment';
import 'moment/locale/id';
import Spinner from 'react-native-loading-spinner-overlay';

import { HeaderOne } from '../../Header';
import { Button } from '../../Buttons';
import { BASE_URL, AUTH_TOKEN } from '../../config';

export class TambahHari extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                nama: '',
                tgl_hari: '',
                displayDate: '',
                catatan: ''
            },
            loading: false,
            errors: []
        };
    }

    handleChangeText = (key, text) => {
        this.setState({
            form: {
                ...this.state.form,
                [key]: text
            }
        });
    }

    showDatePicker = async (target) => {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date()
            });

            moment.locale('id');

            if(action !== DatePickerAndroid.dismissedAction) {
                let mysqlFormattedDate = moment(`${year}-${("0" + (month + 1)).slice(-2)}-${day}`, 'YYYY-MM-DD');
                let displayDate = moment(mysqlFormattedDate).format('ll');

                this.setState({
                    form: {
                        ...this.state.form,
                        tgl_hari: mysqlFormattedDate.format('YYYY-MM-DD'),
                        displayDate: displayDate
                    }
                });

                Keyboard.dismiss();
            }
        } catch({ code, message }) {
            console.warn('Cannot open datepicker ', message);
        }
    }

    onSimpan =  async () => {
        this.setState({ loading: true });

        const { nama, tgl_hari, catatan } = this.state.form;
        const { history, match } = this.props;

        let data = {nama, tgl_hari, catatan, id_minggu: match.params.id_minggu};
        let token = await AsyncStorage.getItem(AUTH_TOKEN);

        try {
            let response = await axios.post(`${BASE_URL}api/hari/store`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            this.setState({ loading: false });

            history.push(`/minggu/detail/${match.params.id_minggu}`);
            ToastAndroid.show('Data hari berhasil di simpan', ToastAndroid.SHORT);
        } catch(error) {
            this.setState({ loading: false, errors: error.response.data.errors });
        }
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

        const { errors } = this.state;

        const namaHariError = ('nama' in errors) ? (
            <Text style={errorText}>{errors.nama[0]}</Text>
        ) : null;

        const tanggalHariError = ('tgl_hari' in errors) ? (
            <Text style={errorText}>{errors.tgl_hari[0]}</Text>
        ) : null;

        return(
            <View>
                <Spinner
                    visible={this.state.loading}
                    textContent={'Loading...'}
                    overlayColor="rgba(0, 0, 0, 0.5)"
                    textStyle={loadingTextStyle}
                    animation="fade" />

                <HeaderOne topBtn={true} topBtnLink={`/minggu/detail/${match.params.id_minggu}`} />
                <View style={container}>
                    <Text style={centerTitle}>Tambah Hari Baru</Text>
                    <ScrollView showsHorizontalScrollIndicator={true}>
                        <KeyboardAvoidingView style={formContainer} behavior="position" enabled>
                            <View style={formGroup}>
                                <TextInput
                                    style={formInput} 
                                    onChangeText={text => this.handleChangeText('nama', text)}
                                    placeholder="Nama hari" />
                                    {namaHariError}
                            </View>
                            <View style={formGroup}>
                                <TextInput
                                    style={formInput} 
                                    onFocus={this.showDatePicker}
                                    value={this.state.form.displayDate}
                                    placeholder="Tanggal hari" />
                                    {tanggalHariError}
                            </View>
                            <View style={formGroup}>
                                <TextInput 
                                    style={formInput} 
                                    multiline={true}
                                    numberOfLines={7}
                                    onChangeText={text => this.handleChangeText('catatan', text)}
                                    placeholder="Catatan (opsional)" />
                            </View>
                            <View style={formGroup}>
                                <Button
                                    text="Simpan"
                                    style="primary"
                                    handle={this.onSimpan}
                                    optionalStyle={formSubmitBtn}
                                />
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const window = Dimensions.get('window');

console.log(window.scale);

const styles = StyleSheet.create({
    container: {
        paddingLeft: 25,
        paddingRight: 25,
        height: (window.height - (window.height / window.scale)) - 30,
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