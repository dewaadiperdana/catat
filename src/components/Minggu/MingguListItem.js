import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import moment from 'moment';

import { currencyFormatter } from '../Common';

export const MingguListItem = ({ item, history }) => {
    const {
        mingguItemContainer,
        mingguItemCol,
        mingguTgl,
        mingguKe,
        mingguUangBelanja,
        mingguTotalBelanja,
        textRight,
        mingguItemColLg,
        mingguItemColSm,
        mingguItemColXs
    } = styles;

    moment.locale('id');

    const tglAwal = item.tgl_awal ? (
        moment(item.tgl_awal).format('ll')
    ) : '???';

    const tglAkhir = item.tgl_akhir ? (
        moment(item.tgl_akhir).format('ll')
    ) : '???';

    return(
        <TouchableOpacity onPress={() => history.push(`/minggu/detail/${item.id}`)}>
            <View style={mingguItemContainer}>
                <View style={[mingguItemCol, mingguItemColLg]}>
                    <Text style={mingguKe}>Minggu Ke-{item.minggu_ke}</Text>
                    <Text style={mingguTgl}>{tglAwal} - {tglAkhir}</Text>
                </View>
                <View style={[mingguItemCol, mingguItemColLg]}>
                    <Text style={mingguUangBelanja}>+ {currencyFormatter(item.uang_belanja)}</Text>
                    <Text style={mingguTotalBelanja}>- {currencyFormatter(item.total_belanja ? item.total_belanja : 0)}</Text>
                </View>
                <View style={[mingguItemCol, mingguItemColSm]}>
                    <Icon name="share" size={20} style={textRight} color="#b2bec3" />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    mingguItemContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#f1f1f1',
        paddingTop: 10,
        paddingBottom: 10
    },
    mingguItemCol: {
        alignSelf: 'center',
        width: width / 3,
    },
    mingguItemColLg: {
        width: '45%'
    },
    mingguItemColSm: {
        width: '10%'
    },
    mingguKe: {
        fontFamily: 'poppins-bold',
        fontSize: 13
    },
    mingguTgl: {
        fontFamily: 'poppins-regular',
        fontSize: 10
    },
    mingguUangBelanja: {
        color: '#369AEF',
        fontFamily: 'poppins-bold',
        fontSize: 13
    },
    mingguTotalBelanja: {
        color: '#D63031',
        fontFamily: 'poppins-regular',
        fontSize: 13
    },
    mingguDetailBtn: {
        width: 20,
        height: 20
    },
    textRight: {
        textAlign: 'right'
    }
});