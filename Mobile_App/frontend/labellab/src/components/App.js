import React, {Component} from 'react';
import {
  ImagePickerIOS,
  Image,
} from 'react-native';
import { View,Container,Content, Button,Icon, Text,Header,Left,Body,Right,Title,Footer, FooterTab, Badge } from 'native-base';
import MyHeader from './Header';


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
          console.log("upload succes", response);
          alert("Upload success!");
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
            <Button vertical info style = {{ alignSelf: 'center'}} onPress={this.pickImage.bind(this)} >
              <Icon name="camera" />
              <Text>Camera</Text>
            </Button>

            <Button vertical info style = {{alignSelf: 'center'}} onPress={this.uploadImage.bind(this)}>
              <Icon name="gallery" />
              <Text>Gallery</Text>
            </Button>
          </View>

          { this.state.image ? <Image style={{height: 300, width: 300, padding: '10%', marginTop:'10%', marginBottom:'10%' , alignSelf: 'center'}} source={{uri: this.state.image}} /> : <Image style={{height: 300, width: 300, padding: '10%', marginTop:'10%', marginBottom:'10%' , alignSelf: 'center'}} source={require('./img/img_placeholder.png')} /> }
        
        <Button vertical info style = {{alignSelf: 'center'}} onPress={this.uploadImage.bind(this)}>
              <Icon name="upload" />
              <Text>upload</Text>
        </Button>
          
        </Content>
        <Footer>
          <FooterTab>
            <Button badge vertical>
              <Badge><Text>2</Text></Badge>
              <Icon name="apps" />
              <Text>Apps</Text>
            </Button>
            <Button vertical>
              <Icon name="camera" />
              <Text>Camera</Text>
            </Button>
            <Button active badge vertical>
              <Badge ><Text>51</Text></Badge>
              <Icon active name="navigate" />
              <Text>Navigate</Text>
            </Button>
            <Button vertical>
              <Icon name="person" />
              <Text>Contact</Text>
            </Button>
          </FooterTab>
        </Footer>
        </Container>
    );
  }
}

export default App;