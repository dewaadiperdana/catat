import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet
} from 'react-native';
import { Link } from 'react-router-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

export const LinkIcon = ({ href, icon, style }) => {
    const {
        iconStyle,
        customStyle
    } = styles;

    let linkIconStyleContainer = (style) ? style : customStyle;

    return(
        <View style={linkIconStyleContainer}>
            <Link to={href} underlayColor={null}>
                <Icon name={icon} size={20} color="#b2bec3" />
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    customStyle: {},
    iconStyle: {
        height: 20,
        width: 20
    }
});