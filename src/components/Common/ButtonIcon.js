import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const ButtonIcon = ({ icon, action, style }) => {
    return(
        <View style={style}>
            <TouchableHighlight underlayColor={null} onPress={action}>
                <Icon name={icon} size={20} color="#b2bec3" />
            </TouchableHighlight>
        </View>
    );
}