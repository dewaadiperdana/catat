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

import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

import moment from 'moment';

import { HeaderTwo } from '../Header';
import { LinkIcon, currencyFormatter, ButtonIcon } from '../Common';
import { BASE_URL, AUTH_TOKEN } from '../config';
import { ListDetail } from '../DetailItem'

export class DetailHari extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hari: {},
            detail: {},
            loading: false,
            token: ''
        };
    }

    async componentDidMount() {
        let token = await AsyncStorage.getItem(AUTH_TOKEN);
        const { match } = this.props;

        this.setState({ loading: true, token: token });

        try {
            let responseHari = await axios.get(`${BASE_URL}api/hari/detail/${match.params.id_hari}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }); 

            let responseItem = await axios.get(`${BASE_URL}api/detail-hari/${match.params.id_hari}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }); 

            this.setState({
                loading: false,
                hari: responseHari.data.hari,
                detail: responseItem.data.detail
            });
        } catch(error) {
            this.setState({ loading: false });
            console.log(error);
        }
    }

    onDelete = async (hari) => {
        const { token } = this.state;
        const { history } = this.props;

        Alert.alert(
            'Anda yakin?',
            'Apakah anda yakin ingin menghapus data hari ini?',
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
                            let response = await axios.delete(`${BASE_URL}api/hari/${hari.id}`, {
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                }
                            });

                            history.push(`/minggu/detail/${hari.id_minggu}`);
                            ToastAndroid.show('Data hari telah dihapus', ToastAndroid.SHORT);
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

        const { match } = this.props;
        const { hari, detail } = this.state;

        return(
            <View>
                <Spinner
                    visible={this.state.loading}
                    textContent={'Loading...'}
                    overlayColor="rgba(0, 0, 0, 0.5)"
                    textStyle={loadingTextStyle}
                    animation="fade" />

                <HeaderTwo
                    title={`Hari ke-${hari.hari_ke}`}
                    style="hello"
                    cta={true}
                    ctaText="Detail Baru"
                    ctaLink={`/detail-item/tambah/${hari.id_minggu}/${hari.id}`}
                    topCta={true}
                    topCtaType="back"
                    topCtaLink={`/minggu/detail/${match.params.id_minggu}`} />
                <View style={container}>
                    <View style={topActionContainer}>
                        <LinkIcon style={topActionIcon} href={`/hari/edit/${match.params.id_minggu}/${match.params.id_hari}`} icon="edit" />
                        <ButtonIcon style={topActionIcon} icon="trash" action={() => this.onDelete(hari)} />
                    </View>
                    <View style={scrollContainer}>
                        <ScrollView showsVerticalScrollIndicator={true}>
                            <View style={mainDetailList}>
                                <View style={mainDetailListItem}>
                                    <View>
                                        <Text style={mainDetailItemLabel}>{hari.nama}</Text>
                                        <Text style={{ fontFamily: 'poppins-regular' }}>
                                            {moment(hari.tgl_hari).format('ll')}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontFamily: 'poppins-regular' }}>
                                            {currencyFormatter(hari.total_belanja ? hari.total_belanja : 0)}
                                        </Text>
                                    </View>
                                </View>
                                <View style={mainDetailListItem}>
                                    <Text style={mainDetailItemLabel}>Catatan</Text>
                                    <View style={mainDetailListItemWrap}>
                                        <Text style={{ fontFamily: 'poppins-regular' }}>
                                            {hari.catatan ? hari.catatan : '-'}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={detailItemList}>
                                <Text style={detailItemListTitle}>Catatan anda hari ini</Text>
                                <ListDetail detail={detail} {...this.props} />
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
