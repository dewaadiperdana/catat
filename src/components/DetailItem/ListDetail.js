import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import { ListItemDetail } from '../DetailItem';

export const ListDetail = (props) => {
    const { detail } = props;

    const { detailListItemContainer, textCenter } = styles;

    const listDetail = detail.length > 0 ? (
        detail.map(item => (
            <ListItemDetail key={item.id} item={item} {...props} />
        ))
    ) : (
        <Text style={textCenter}>Anda belum menambahkan detail</Text>
    );
    return(
        <View style={detailListItemContainer}>
            {listDetail}
        </View>
    );
};

const styles = StyleSheet.create({
    detailListItemContainer: {
        backgroundColor: '#f8f8f8',
        marginTop: 15,
    },
    textCenter: {
        fontFamily: 'poppins-regular',
        textAlign: 'center'
    }
});