import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { currencyFormatter } from '../Common';

export const ListItemDetail = (props) => {
    const { item, match, history } = props;

    const {
        detailListItem,
        detailListItemHarga,
        detailListItemCol,
        textCenter,
        textRight
    } = styles;

    return(
        <TouchableOpacity 
            onPress={() => history.push(`/detail-item/detail/${match.params.id_minggu}/${match.params.id_hari}/${item.id}`)}>
            <View style={detailListItem}>
                <View style={detailListItemCol}>
                    <Text>{item.nama}</Text>
                </View>
                <View style={detailListItemCol}>
                    <Text style={detailListItemHarga}>
                        {currencyFormatter(item.total_belanja)}
                    </Text>
                </View>
                <View style={detailListItemCol}>
                    <Text style={textRight}>
                        <Icon name="share" size={20} color="#b2bec3" />
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
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
        fontSize: 15,
        textAlign: 'center'
    },
    detailListItemCol: {
        width: width / 3.5,
        flexWrap: 'wrap',
    },
    textCenter: {
        textAlign: 'center'
    },
    textRight: {
        textAlign: 'right'
    }
});