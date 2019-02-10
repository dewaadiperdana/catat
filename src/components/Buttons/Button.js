import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';

export const Button = ({ text, style, handle, optionalStyle }) => {
    const { buttonContainer, buttonText } = styles;
    let buttonStyleContainerOpts = '';
    let buttonStyleTextOpts = '';

    switch(style) {
        case 'white':
            buttonStyleContainerOpts = 'buttonContainerWhite';
            buttonStyleTextOpts = 'buttonTextWhite';
            break;

        default:
            buttonStyleContainerOpts = 'buttonContainerPrimary';
            buttonStyleTextOpts = 'buttonTextPrimary';
            break;
    }

    let buttonContainerStyle = styles[buttonStyleContainerOpts];
    let buttonTextStyle = styles[buttonStyleTextOpts];
    
    return(
        <View style={[buttonContainerStyle, optionalStyle]}>
            <TouchableOpacity onPress={handle}>
                <Text style={buttonTextStyle}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainerPrimary: {
        borderWidth: 2,
        borderRadius: 8,
        borderColor: '#0984E3',
        paddingTop: 8,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 8,
        alignSelf: 'center',
    },
    buttonTextPrimary: {
        fontSize: 12,
        fontFamily: 'poppins-regular',
        textAlign: 'center',
        alignSelf: 'center',
        color: '#0984E3'
    }
});