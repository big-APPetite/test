import React, {Component} from 'react';
import {Text, View} from 'react-native';
import SearchDropdown from './SearchDropdown';

export default function SearchScreen() {
    return (
            <View>
                <Text>This is the search screen</Text>               
                <SearchDropdown />               
      </View>
        )
}