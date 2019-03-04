import React, {Component} from 'react';
import {
  ImagePickerIOS,
  Image,
} from 'react-native';
import { View,Container,Content, Button,Icon, Text,Header,Left,Body,Right,Title,Footer, FooterTab, Badge } from 'native-base';
import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class App extends Component{

  constructor() {
    super();
    this.state = { image: null};
  }



  pickImage(event) {
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        //const source = { uri: response.uri };

        // You can also display the image using data:
        const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({ image: source.uri });
      }
    });

  }

  uploadImage(event) {
 
    var body = new FormData();
        body.append('photo', {
          // uri : Platform.OS === "android" ? this.state.image : this.state.image.replace("file://", ""),
          uri :this.state.image,
          name: 'photo.jpeg',
          type: 'image/jpeg'});


    fetch("http://192.168.0.6:3000/listUsers", {
        method: 'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'multipart/form-data',
        },
        body:body
      })
        .then(response => response.json())
        .then(response => {
          alert("your " + response.message + " is uploaded successfully");
        })
        .catch(error => {
          console.log("upload error", error);
          alert("Upload failed!");
        });
  }

  camera_toggle=()=>{
    // alert('clicked');
    ImagePicker.launchCamera(options, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      //const source = { uri: response.uri };

      // You can also display the image using data:
      const source = { uri: 'data:image/jpeg;base64,' + response.data };

      this.setState({ image: source.uri });
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
            <Title>Labellab</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
        </Right>
        </Header>
        <Content contentContainerStyle={{ justifyContent: 'center',flex:1 }}>

          <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
            <Button vertical info style = {{ alignSelf: 'center'}} onPress={this.camera_toggle}>
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