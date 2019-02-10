import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    AsyncStorage,
    Alert,
    ToastAndroid
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import axios from 'axios';
import moment from 'moment';

import { BASE_URL, AUTH_TOKEN } from '../config';
import { HeaderTwo } from '../Header';
import { LinkIcon, ButtonIcon, currencyFormatter } from '../Common';
import { ListHari } from '../Hari';

export class DetailMinggu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: '',
            minggu: {},
            hari: [],
            loading: false
        };
    }

    async componentDidMount() {
        let token = await AsyncStorage.getItem(AUTH_TOKEN);

        this.setState({
            loading: true,
            token: token
        });

        const { params } = this.props.match;
        
        try {
            let responseMinggu = await axios.get(`${BASE_URL}api/minggu/detail/${params.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            let responseHari = await axios.get(`${BASE_URL}api/hari/${responseMinggu.data.minggu.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            this.setState({ 
                loading: false, 
                minggu: responseMinggu.data.minggu,
                hari: responseHari.data.hari
            });
        } catch(error) {
            this.setState({ loading: false });
            console.log(error.response);
        }
    }

    onDelete = async (id) => {
        const { token } = this.state;
        const { history } = this.props;

        Alert.alert(
            'Anda yakin?',
            'Apakah anda yakin ingin menghapus data minggu ini?',
            [
                {
                    text: 'Batalkan',
                    onPress: () => console.log('canceled'),
                    style: 'cancel'
                },
                {
                    text: 'Saya Yakin',
                    onPress: async () => {
                        this.setState({ loading: true });

                        try {
                            let response = await axios.delete(`${BASE_URL}api/minggu/${id}`, {
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                }
                            });

                            history.push('/dashboard');
                            ToastAndroid.show('Data minggu telah dihapus', ToastAndroid.SHORT);
                        } catch (error) {
                            this.setState({ loading: false });
                            console.log(error);
                        }
                    }
                }
            ]
        );
    }

    render() {
        moment.locale('id');

        const {
            container,
            topActionContainer,
            topActionIcon,
            mainDetailList,
            mainDetailListItem,
            mainDetailItemLabel,
            mainDetailListItemWrap,
            detailItemList,
            detailItemListTitle,
            detailListItemContainer,
            detailListItem,
            detailListItemHarga,
            scrollContainer,
            loadingTextStyle
        } = styles;

        const { minggu, hari } = this.state;

        return(
            <View>
                 <Spinner
                    visible={this.state.loading}
                    textContent={'Loading...'}
                    overlayColor="rgba(0, 0, 0, 0.5)"
                    textStyle={loadingTextStyle}
                    animation="fade" />

                <HeaderTwo
                    title={`Minggu ke-${minggu.minggu_ke}`}
                    style="hello"
                    cta={true}
                    ctaText="Hari Baru"
                    ctaLink={`/hari/tambah/${minggu.id}`}
                    topCta={true}
                    topCtaType="back"
                    topCtaLink="/dashboard" />
                <View style={container}>
                    <View style={topActionContainer}>
                        <LinkIcon style={topActionIcon} href={`/minggu/edit/${minggu.id}`} icon="edit" />
                        <ButtonIcon style={topActionIcon} icon="trash" action={() => this.onDelete(minggu.id)} />
                    </View>
                    <View style={scrollContainer}>
                        <ScrollView showsVerticalScrollIndicator={true}>
                            <View style={mainDetailList}>
                                <View style={mainDetailListItem}>
                                    <Text style={mainDetailItemLabel}>
                                        {minggu.tgl_awal ? moment(minggu.tgl_awal).format('ll') : '???'}
                                    </Text>
                                    <Text>
                                        {currencyFormatter(minggu.uang_belanja ? minggu.uang_belanja : 0)}
                                    </Text>
                                </View>
                                <View style={mainDetailListItem}>
                                    <Text style={mainDetailItemLabel}>
                                        Pengeluaran
                                    </Text>
                                    <Text>
                                        {currencyFormatter(minggu.total_belanja ? minggu.total_belanja : 0)}
                                    </Text>
                                </View>
                                <View style={mainDetailListItem}>
                                    <Text style={mainDetailItemLabel}>Sisa</Text>
                                    <Text>
                                        {currencyFormatter(minggu.sisa_uang ? minggu.sisa_uang : 0)}
                                    </Text>
                                </View>
                                <View style={mainDetailListItem}>
                                    <Text style={mainDetailItemLabel}>Catatan</Text>
                                    <View style={mainDetailListItemWrap}>
                                        <Text style={{ fontFamily: 'poppins-regular' }}>
                                            {minggu.catatan ? minggu.catatan : '-'}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={detailItemList}>
                                <Text style={detailItemListTitle}>Catatan anda minggu ini</Text>
                                <ListHari hari={hari} {...this.props} />
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 25,
        paddingVertical: 25
    },
    scrollContainer: {
        height: (window.height - (window.height / window.scale)) - 65
    },
    topActionContainer: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    topActionIcon: {
        marginLeft: 10
    },
    mainDetailList: {
        marginVertical: 25,
    },
    mainDetailListItem: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: '#d5d5d5'
    },
    mainDetailListItemWrap: {
        width: 200,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    mainDetailItemLabel: {
        width: 90,
        fontFamily: 'poppins-bold'
    },
    detailItemList: {

    },
    detailItemListTitle: {
        fontFamily: 'poppins-bold',
        fontSize: 15,
        textAlign: 'center'
    },
    loadingTextStyle: {
        fontFamily: 'poppins-regular',
        fontSize: 14,
        color: 'white'
    }
});
