import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Container,Content, Button,Icon } from 'native-base';
import MyHeader from './Header';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
class App extends Component{
  render() {
    return (
      <Container>
        <MyHeader/>
        <Content>
          <Button iconLeft>
            <Icon name='home' />
            <Text>Home</Text>
          </Button>
        </Content>
        </Container>
    );
  }
}

export default App;