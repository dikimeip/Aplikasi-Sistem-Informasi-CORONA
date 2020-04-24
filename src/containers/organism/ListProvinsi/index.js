import React from 'react';
import { View, Text } from 'react-native';

const ListProvinsi = (props) => {
    return (
        <View style={{ marginLeft: 20,marginBottom:7 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{props.provinsi}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 15, color: 'blue', marginLeft: 35 }}>Sembuh = {props.sembuh}</Text>
                <Text style={{ fontSize: 15, color: 'green', marginLeft: 35 }}>Positif = {props.positif}</Text>
                <Text style={{ fontSize: 15, color: 'red', marginLeft: 35 }}>Meningal = {props.meninggal}</Text>
            </View>
        </View>
    )
}

export default ListProvinsi