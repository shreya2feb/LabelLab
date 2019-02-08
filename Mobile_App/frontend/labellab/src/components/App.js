import React, {Component} from 'react';
import { Container,Content, Button,Icon, Text,Header,Left,Body,Right,Title,Footer, FooterTab, Badge } from 'native-base';
import MyHeader from './Header';


class App extends Component{
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
          <Button rounded info style = {{padding: '10%', alignSelf: 'center'}}>
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