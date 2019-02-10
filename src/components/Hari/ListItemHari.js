import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { currencyFormatter } from '../Common';

export const ListItemHari = (props) => {
    const { 
        detailListItemContainer,
        detailListItem,
        detailListItemHarga
    } = styles;

    const { item, history } = props;

    moment.locale('id');

    return(
        <View style={detailListItemContainer}>
            <TouchableOpacity onPress={() => history.push(`/hari/detail/${item.id_minggu}/${item.id}`)}>
                <View style={detailListItem}>
                    <View>
                        <Text>Hari ke-{item.hari_ke}</Text>
                        <Text>{item.nama} - {item.tgl_hari ? moment(item.tgl_hari).format('ll') : '???'}</Text>
                    </View>
                    <View>
                        <Text style={detailListItemHarga}>
                            {currencyFormatter(item.total_belanja ? item.total_belanja : 0)}
                        </Text>
                    </View>
                    <View>
                        <Text>
                            <Icon name="share" size={20} color="#b2bec3" />
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
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
});