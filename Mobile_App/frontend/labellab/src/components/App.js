import React, {Component} from 'react';
import {
  ImagePickerIOS,
  Image,
} from 'react-native';
import { View,Container,Content, Button,Icon, Text,Header,Left,Body,Right,Title,Footer, FooterTab, Badge } from 'native-base';


class App extends Component{

  constructor() {
    super();
    this.state = { image: null,type:null};
  }



  pickImage(event) {
    ImagePickerIOS.openSelectDialog({}, (imageUri, imageType) => {
      this.setState({ image: imageUri,type : imageType });
    }, error => console.warn(error));
  }

  uploadImage(event) {

    var body = new FormData();
        body.append('photo', {
          uri : this.state.image,
          name: 'photo.jpeg',
          type: 'image/jpeg'});


    fetch("http://localhost:3000/listUsers", {
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
            <Button vertical info style = {{ alignSelf: 'center'}} >
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