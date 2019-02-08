import React, {Component} from 'react';
import {
  ImagePickerIOS,
  Image,
} from 'react-native';
import { Container,Content, Button,Icon, Text,Header,Left,Body,Right,Title,Footer, FooterTab, Badge } from 'native-base';
import MyHeader from './Header';


class App extends Component{
  constructor() {
    super();
    this.state = { image: null };
  }



  pickImage() {
    // openSelectDialog(config, successCallback, errorCallback);
    ImagePickerIOS.openSelectDialog({}, imageUri => {
      this.setState({ image: imageUri });
    }, error => console.error(error));
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
          <Button rounded info style = {{padding: '10%', alignSelf: 'center'}} onPress={this.pickImage}>
            <Text>Upload</Text>
          </Button>
          {this.state.image?
          <Image style={{ flex: 1 }} source={{ uri: this.state.image }} /> :
          null
        }
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