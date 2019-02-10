import React, { Component } from 'react';
import { 
    View, 
    Text, 
    ImageBackground, 
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import { Link } from 'react-router-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

export const HeaderTwo = ({
    title, 
    cta, 
    ctaText, 
    ctaLink, 
    topCta, 
    topCtaType,
    topCtaLink,
    topCtaAction
}) => {
    const {
        headerContainer, 
        headerBackground, 
        headerText, 
        mainCtaContainer, 
        mainCtaText,
        topCtaContainer,
    } = styles;

    const ctaContent = cta ?
        <View style={mainCtaContainer}>
            <Link to={ctaLink} underlayColor={null}>
                <Text style={mainCtaText}>{ctaText}</Text>
            </Link>
        </View>
    : null;

    const topCtaContent = (topCtaType == 'logout' && topCta) ? (
        <View style={topCtaContainer}>
            <TouchableHighlight onPress={topCtaAction} underlayColor={null}>
                <Icon name="power-off" size={25} color='#ffffff' />
            </TouchableHighlight>
        </View>
    ) : (
        <View style={topCtaContainer}>
            <Link to={topCtaLink} underlayColor={null}>
                <Icon name="arrow-left" size={25} color='#ffffff' />
            </Link>
        </View>
    );

    return(
        <View style={headerContainer}>
            <ImageBackground style={headerBackground} source={require('../../assets/images/header-intro-2.png')}>
                <View>
                    {topCtaContent}
                    <Text style={headerText}>{title}</Text>
                    {ctaContent}
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        width: null,
        height: 200,
        marginTop: 0
    },
    headerBackground: {
        width: null,
        height: 200
    },
    headerText: {
        width: 150,
        fontFamily: 'poppins-bold',
        fontSize: 15,
        textAlign: 'center',
        color: '#ffffff',
        marginTop: 30,
        lineHeight: 20,
        marginLeft: 20
    },
    mainCtaContainer: {
        borderWidth: 2,
        borderRadius: 8,
        borderColor: '#ffffff',
        paddingTop: 8,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 8,
        alignSelf: 'flex-start',
        marginTop: 15,
        marginLeft: 55
    },
    mainCtaText: {
        fontSize: 12,
        fontFamily: 'poppins-regular',
        textAlign: 'center',
        alignSelf: 'flex-start',
        color: '#ffffff'
    },
    topCtaContainer: {
        width: 25,
        height: 25,
        marginTop: 10,
        marginLeft: 10,
    },
});