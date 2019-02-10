import React, { Component } from 'react';
import { Text, View, StyleSheet, ToastAndroid, AsyncStorage } from 'react-native';
import { Link, Redirect } from 'react-router-native';

import { AUTH_TOKEN, AUTH_USER, BASE_URL } from '../config';

import Spinner from 'react-native-loading-spinner-overlay';

import axios from 'axios';

import { HeaderTwo } from '../Header';
import { MingguList } from '../Minggu';

export class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            auth: {
                token: '',
                user: {}
            },
            minggu: [],
            loading: false,
            loggedOut: false
        };
    }

    onLogoutPress = async () => {
        await AsyncStorage.removeItem(AUTH_TOKEN);
        this.setState({ loggedOut: true });
        this.props.history.push('/');

        ToastAndroid.show('You are logged out', ToastAndroid.SHORT);
    }

    async componentDidMount() {
        let authUser = await AsyncStorage.getItem(AUTH_USER);
        let authToken = await AsyncStorage.getItem(AUTH_TOKEN);
        
        this.setState({
            auth: {
                token: authToken,
                user: JSON.parse(authUser)
            },
            loading: true
        });

        const { token, user } = this.state.auth;

        try {
            let response = await axios.get(BASE_URL + 'api/minggu/' + user.id, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            this.setState({ loading: false, minggu: response.data.minggu });
        } catch(error) {
            this.setState({ loading: false });

            console.log(error);
        }
    }

    render() {
        const { 
            dashboardContainer, 
            dashboardText, 
            dashboardCtaContainer, 
            dashboardCtaText,
            loadingTextStyle
        } = styles;

        return(
            <View>
                 <Spinner
                    visible={this.state.loading}
                    textContent={'Loading...'}
                    overlayColor="rgba(0, 0, 0, 0.5)"
                    textStyle={loadingTextStyle}
                    animation="fade" />

                <HeaderTwo
                    title="Belanja Apa Anda Minggu Ini?"
                    style="hello"
                    cta={true}
                    ctaText="Catat"
                    ctaLink="/minggu/tambah"
                    topCta={true}
                    topCtaType="logout"
                    topCtaLink="/dashboard"
                    topCtaAction={this.onLogoutPress}
                />

                <View style={dashboardContainer}>
                    <Text style={dashboardText}>Catatan Anda 4 Minggu Terakhir</Text>
                    <MingguList minggu={this.state.minggu} {...this.props} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    dashboardContainer: {
        paddingLeft: 25,
        paddingRight: 25
    },
    dashboardText: {
        marginTop: 35,
        fontFamily: "poppins-bold",
        fontSize: 17,
        lineHeight: 25,
        textAlign: 'center'
    },
    loadingTextStyle: {
        fontFamily: 'poppins-regular',
        fontSize: 14,
        color: 'white'
    }
});