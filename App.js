/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, Image, ScrollView, FlatList } from 'react-native';
import Axios from 'axios';
import ListProvinsi from './src/containers/organism/ListProvinsi';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      meninggal: "",
      positif: "",
      sembuh: "",
      provinsi : ""
    }
  }

  componentDidMount = () => {
    Axios.get("https://api.kawalcorona.com/indonesia").then(res => {
      //console.log(res.data[0].positif)
      this.setState({
        meninggal: res.data[0].meninggal,
        positif: res.data[0].positif,
        sembuh: res.data[0].sembuh,
      })
    }).catch(err => {
      console.log(err)
    })

    Axios.get("https://api.kawalcorona.com/indonesia/provinsi").then(res => {
      console.log(res.data[2].attributes)
      this.setState({
        provinsi : res.data
      })
    }).catch(err => {
      console.log(err)
    })
  }

  keyExtractor = (item,index) => index.toString()
  renderItem = ({item}) => (
    //console.log(item.attributes.Provinsi)
    <ListProvinsi provinsi={item.attributes.Provinsi} sembuh={item.attributes.Kasus_Semb} positif={item.attributes.Kasus_Posi} meninggal={item.attributes.Kasus_Meni} />
  )

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={{ width: '100%', height: 250, backgroundColor: '#4eb7ed', borderBottomLeftRadius: 80, borderBottomRightRadius: 80, position: 'absolute' }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ height: 150, width: 150, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                <Image source={require('./src/asset/virus.png')} style={{ width: 100, height: 100 }} />
              </View>
              <View style={{ height: 150, justifyContent: 'center' }}>
                <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>Sistem Informasi</Text>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>COVID-19</Text>
              </View>
            </View>
            <View style={{ marginHorizontal: 20, marginTop: 18 }}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>INDONESIA</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', height: 150, width: '100%', position: 'relative', top: 200 }}>
            <View style={{ marginLeft: 30, flex: 1, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: 'grey', justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('./src/asset/patient.png')} style={{ width: 80, height: 80 }} ></Image>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'grey', marginTop: 10 }}>{this.state.positif}</Text>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'green' }}>Positif</Text>
            </View>
            <View style={{ marginHorizontal: 20, flex: 1, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: 'grey', justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('./src/asset/healt.png')} style={{ width: 80, height: 80 }} ></Image>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'grey', marginTop: 10 }}>{this.state.sembuh}</Text>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'blue' }}>Sembuh</Text>
            </View>
            <View style={{ marginRight: 30, flex: 1, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: 'grey', justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('./src/asset/dead.png')} style={{ width: 80, height: 80 }} ></Image>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'grey', marginTop: 10 }}>{this.state.meninggal}</Text>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'red' }}>Meninggal</Text>
            </View>
          </View>
          <View style={{ flex: 1, position: 'absolute', top: 380, }}>
            
          <FlatList
              horizontal = {false}
              data={this.state.provinsi}
              keyExtractor = {this.keyExtractor}
              renderItem = {this.renderItem}
          />

          </View>
      </View>
    )
  }
}

export default App;
