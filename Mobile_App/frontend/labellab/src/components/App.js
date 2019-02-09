import React, {Component} from 'react';
import {
  ImagePickerIOS,
  Image,
} from 'react-native';
import { Container,Content, Button,Icon, Text,Header,Left,Body,Right,Title,Footer, FooterTab, Badge } from 'native-base';
import MyHeader from './Header';


const createFormData = (photo, body) => {
  const data = new FormData();

  data.append("photo", {
    name: 'imageName.png',
    type: 'image/png',
    uri:
       photo.image
  });

    Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  // console.warn(data);
  return data;

};

class App extends Component{
  constructor() {
    super();
    this.state = { image: null };
    // this.pickImage = this.pickImage.bind(this);
  }



  pickImage(event) {
    // openSelectDialog(config, successCallback, errorCallback);
    ImagePickerIOS.openSelectDialog({}, imageUri => {
      this.setState({ image: imageUri });
    }, error => console.warn(error));
  }

  uploadImage(event) {
    let body = new FormData();
    body.append('photo', {uri: this.state.image, name: 'photo.png',filename :'imageName.png',type: 'image/png'});
    body.append('Content-Type', 'image/png');
    // console.warn(body)
    fetch("http://localhost:3000/listUsers",{ method: 'POST',headers:{  
     "Content-Type": "multipart/form-data",
     "otherHeader": "foo",
     },
     body: {"height": "hfufjjhgjhgh",}
     })
  .then((res) => checkStatus(res))
  .then((res) => res.json())
  .then((res) => { console.log("response" +JSON.stringify(res)); })
  .catch((e) => console.log(e))
  .done()
  }

  render() {
    return (
      <Container>
        <Header>
        <Left>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
        </Right>
        </Header>
        <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
          <Button rounded info style = {{padding: '10%', alignSelf: 'center'}} onPress={this.pickImage.bind(this)}>
            <Text>Choose</Text>
          </Button>
          { this.state.image ? <Image style={{height: 100, width: 100}} source={{uri: this.state.image}} /> : null }
          <Button rounded info style = {{padding: '10%', alignSelf: 'center'}} onPress={this.uploadImage.bind(this)}>
            <Text>Upload</Text>
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