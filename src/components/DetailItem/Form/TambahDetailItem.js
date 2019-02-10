import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
    Dimensions,
    AsyncStorage,
    ScrollView,
    ToastAndroid
} from 'react-native';

import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

import { HeaderOne } from '../../Header';
import { Button } from '../../Buttons';
import { BASE_URL, AUTH_TOKEN } from '../../config';

export class TambahDetailItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            token: '',
            form: {
                nama: '',
                total_belanja: '',
                catatan: ''
            },
            errors: []
        };
    }

    async componentDidMount() {
        let token = await AsyncStorage.getItem(AUTH_TOKEN);
        
        this.setState({ token });
    }

    handleChangeText = (key, text) => {
        this.setState({
            form: {
                ...this.state.form,
                [key]: text
            }
        });
    }

    onSimpan = async () => {
        this.setState({ loading: true });

        const { match, history } = this.props;

        let data = {id_hari: match.params.id_hari, ...this.state.form};
        
        try {
            let response = await axios.post(`${BASE_URL}api/detail-hari/store`, data, {
                headers: {
                    'Authorization': `Bearer ${this.state.token}`
                }
            });

            this.setState({ loading: false });
            history.push(`/hari/detail/${match.params.id_minggu}/${match.params.id_hari}`);
            ToastAndroid.show('Data detail item berhasil di simpan', ToastAndroid.SHORT);
        } catch(error) {
            this.setState({ loading: false, errors: error.response.data.errors });
            console.log(error.response.data.errors);
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

        const namaDetailError = ('nama' in errors) ? (
            <Text style={errorText}>{errors.nama[0]}</Text>
        ) : null;

        const hargaItemError = ('total_belanja' in errors) ? (
            <Text style={errorText}>{errors.total_belanja[0]}</Text>
        ) : null;

        return(
            <View>
                 <Spinner
                    visible={this.state.loading}
                    textContent={'Loading...'}
                    overlayColor="rgba(0, 0, 0, 0.5)"
                    textStyle={loadingTextStyle}
                    animation="fade" />

                <HeaderOne topBtn={true} topBtnLink={`/hari/detail/${match.params.id_minggu}/${match.params.id_hari}`} />
                <View style={container}>
                    <Text style={centerTitle}>Tambah Detail Item Baru</Text>
                    <ScrollView showsHorizontalScrollIndicator={true}>
                        <KeyboardAvoidingView style={formContainer} behavior="position" enabled>
                            <View style={formGroup}>
                                <TextInput
                                    style={formInput} 
                                    onChangeText={text => this.handleChangeText('nama', text)}
                                    placeholder="Nama item" />
                                    {namaDetailError}
                            </View>
                            <View style={formGroup}>
                                <TextInput
                                    style={formInput} 
                                    onChangeText={text => this.handleChangeText('total_belanja', text)}
                                    placeholder="Harga item" />
                                    {hargaItemError}
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