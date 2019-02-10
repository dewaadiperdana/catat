import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export const ButtonIcon = ({ icon, action }) => {
    return(
        <View>
            <TouchableHighlight underlayColor="#ffffff">
                <Text>Button With Icon</Text>
            </TouchableHighlight>
        </View>
    );
}