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

import { HeaderTwo } from '../Header';
import { LinkIcon, currencyFormatter, ButtonIcon } from '../Common';
import { BASE_URL, AUTH_TOKEN } from '../config';

export class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: '',
            loading: false,
            detail: ''
        };
    }

    async componentDidMount() {
        const { match } = this.props;
        let token = await AsyncStorage.getItem(AUTH_TOKEN);
        this.setState({ loading: true, token: token });

        try {
            let response = await axios.get(`${BASE_URL}api/detail-hari/detail/${match.params.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            this.setState({ loading: false, detail: response.data.detail });
        } catch(error) {
            this.setState({ loading: false });
            console.log(error);
        }
    }

    onDelete = async (detail) => {
        const { token } = this.state;
        const { history, match } = this.props;

        Alert.alert(
            'Anda yakin?',
            'Apakah anda yakin ingin menghapus data detail ini?',
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
                            let response = await axios.delete(`${BASE_URL}api/detail-hari/${detail.id}`, {
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                }
                            });

                            history.push(`/hari/detail/${match.params.id_minggu}/${match.params.id_hari}`);
                            ToastAndroid.show('Data detail telah dihapus', ToastAndroid.SHORT);
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

        const { detail } = this.state;
        const { match } = this.props;

        return(
            <View>
                <Spinner
                    visible={this.state.loading}
                    textContent={'Loading...'}
                    overlayColor="rgba(0, 0, 0, 0.5)"
                    textStyle={loadingTextStyle}
                    animation="fade"
                    />
                <HeaderTwo
                    title="Detail"
                    style="hello"
                    topCta={true}
                    topCtaType="back"
                    topCtaLink={`/hari/detail/${match.params.id_minggu}/${match.params.id_hari}`} />
                <View style={container}>
                    <View style={topActionContainer}>
                        <LinkIcon 
                            style={topActionIcon}
                            href={`/detail-item/edit/${match.params.id_minggu}/${match.params.id_hari}/${detail.id}`} icon="edit" />
                        <ButtonIcon style={topActionIcon} icon="trash" action={() => this.onDelete(detail)} />
                    </View>
                    <View style={scrollContainer}>
                        <ScrollView showsVerticalScrollIndicator={true}>
                            <View style={mainDetailList}>
                                <View style={mainDetailListItem}>
                                    <Text style={mainDetailItemLabel}>Nama</Text>
                                    <View style={mainDetailListItemWrap}>
                                        <Text style={{ fontFamily: 'poppins-regular' }}>
                                            {detail.nama}
                                        </Text>
                                    </View>
                                </View>
                                <View style={mainDetailListItem}>
                                    <Text style={mainDetailItemLabel}>Total</Text>
                                    <View style={mainDetailListItemWrap}>
                                        <Text style={{ fontFamily: 'poppins-regular' }}>
                                            {currencyFormatter(detail.total_belanja)}
                                        </Text>
                                    </View>
                                </View>
                                <View style={mainDetailListItem}>
                                    <Text style={mainDetailItemLabel}>Catatan</Text>
                                    <View style={mainDetailListItemWrap}>
                                        <Text style={{ fontFamily: 'poppins-regular' }}>
                                            {detail.catatan ? detail.catatan : '-'}
                                        </Text>
                                    </View>
                                </View>
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
    detailListItemContainer: {
        backgroundColor: '#f8f8f8',
        marginTop: 15,
    },
    detailListItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: '#e8e8e8'
    },
    detailListItemHarga: {
        fontFamily: 'poppins-bold',
        fontSize: 15
    },
    loadingTextStyle: {
        fontFamily: 'poppins-regular',
        fontSize: 14,
        color: 'white'
    }
});
