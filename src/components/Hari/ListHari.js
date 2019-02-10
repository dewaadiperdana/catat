import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    AsyncStorage
} from 'react-native';

import { ListItemHari } from '../Hari';

export const ListHari = (props) => {
    const {
        textCenter
    } = styles;

    const { hari } = props;

    const listHari = hari.length > 0 ? (
        hari.map(item => (
            <ListItemHari key={item.id} item={item} {...props} />                          
        ))
    ) : (
        <View>
            <Text style={textCenter}>Anda belum memiliki catatan minggu ini</Text>
        </View>
    );
    
    return(
        <View>
            {listHari}
        </View>
    );
};

const styles = StyleSheet.create({
    textCenter: {
        fontFamily: 'poppins-regular',
        textAlign: 'center',
        marginTop: 15
    }
});