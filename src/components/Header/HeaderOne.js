import React, { Component } from 'react';
import {
    View,
    ImageBackground,
    StyleSheet,
} from 'react-native';

import { Link } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const HeaderOne = ({ topBtn, topBtnLink }) => {
    const {
        headerOneContainer,
        headerImage,
        headerOneTopBtnContainer,
    } = styles;

    const topBtnContent = topBtn ? (
        <Link to={topBtnLink} style={headerOneTopBtnContainer} underlayColor={null}>
            <Icon name="arrow-left" size={25} color="#ffffff" />
        </Link>
    ) : null;

    return(
        <View style={headerOneContainer}>
            <ImageBackground style={headerImage} source={require('../../assets/images/header-intro-1.png')}>
                {topBtnContent}
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    headerOneContainer: {
        marginBottom: 20
    },
    headerImage: {
        width: null,
        height: 200
    },
    headerOneTopBtnContainer: {
        width: 25,
        height: 25,
        marginTop: 15,
        marginLeft: 15,
    },
});