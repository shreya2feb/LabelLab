import React, {Component} from 'react';
import {
  ImagePickerIOS,
  Image,
} from 'react-native';
import axios from 'axios';
import { View,Container,Content, Button,Icon, Text,Header,Left,Body,Right,Title,Footer, FooterTab, Badge } from 'native-base';
import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Select Image',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class App extends Component{

  constructor() {
    super();
    this.state = { image: null, type:null};
  }



  pickImage(event) {
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        //const source = { uri: 'data:image/jpeg;base64,' + response.data };


        this.setState({ image: source.uri,type: response.type });
        console.warn(this.state.type);
      }
    });

  }

 async uploadImage(event) {

    const headers = new Headers();
          headers.append( "Accept", "application/json");
          headers.append( "content-type", "multipart/form-data");
          
    var body = new FormData();
        body.append('photo', {
          uri :this.state.image,
          type: this.state.type,
          name: 'photo.jpeg'
        });

    const fetchData = {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'same-origin',
        headers: headers,
        body: body,
      };


    return fetch("http://labellabmobile.herokuapp.com/upload", fetchData)
        .then(response => response.json())
        .then(response => {
          alert(response.message);
        })
        .catch(error => {
          alert(error);
          //alert("Upload failed!");
        });
  }

  camera_toggle=()=>{
    ImagePicker.launchCamera(options, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      const source = { uri: response.uri };

      // You can also display the image using data:
      //const source = { uri: 'data:image/jpeg;base64,' + response.data };

      this.setState({ image: source.uri,type: response.type });
    }
  });
  }

  render() {
    return (
      <Container>
        <Header>
        <Left>
          </Left>
          <Body>
            <Title>LabelLab</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
        </Right>
        </Header>
        <Content contentContainerStyle={{ justifyContent: 'center',flex:1 }}>

          <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
            <Button vertical info style = {{ alignSelf: 'center'}} onPress={this.camera_toggle.bind(this)}>
              <Icon name="camera" />
              <Text>Camera</Text>
            </Button>

            <Button vertical info style = {{alignSelf: 'center',marginLeft:'10%'}} onPress={this.pickImage.bind(this)} >
              <Icon name="grid" />
              <Text>Gallery</Text>
            </Button>
          </View>

          { this.state.image ? <Image style={{height: 300, width: 300, padding: '10%', marginTop:'10%', marginBottom:'10%' , alignSelf: 'center'}} source={{uri: this.state.image}} /> : <Image style={{height: 300, width: 300, padding: '10%', marginTop:'10%', marginBottom:'10%' , alignSelf: 'center'}} source={require('./img/img_placeholder.png')} /> }
        
        <Button vertical info style = {{alignSelf: 'center'}} onPress={this.uploadImage.bind(this)}>
              <Text>upload</Text>
        </Button>
          
        </Content>
        </Container>
    );
  }
}

export default App;