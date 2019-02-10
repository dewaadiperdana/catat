import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions
} from 'react-native';

import axios from 'axios';

import { MingguListItem } from '../Minggu';

export class MingguList extends Component {
    constructor(props) {
        super(props);

        this.state = {};        
    }

    render() {
        const {
            mingguContainer,
            textCenter
        } = styles;

        const { minggu } = this.props;

        const mingguListItem = minggu.length > 0 ? (
            minggu.map(item => (
                <MingguListItem key={item.id} item={item} {...this.props} />
            ))
        ) : null;

        const mingguList = this.props.minggu.length < 1 ? (
            <View>
                <Text style={textCenter}>Anda belum menambahkan data</Text>
            </View>
        ) : (
            <ScrollView showsVerticalScrollIndicator={true}>
                {mingguListItem}
            </ScrollView>
        );

        return(
            <View style={mingguContainer}>
                {mingguList}
            </View>
        );
    }
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    mingguContainer: {
        marginTop: 20,
        height: (window.height - (window.height / window.scale)) - 65
    },
    textCenter: {
        fontFamily: 'poppins-regular',
        textAlign: 'center'
    }
});