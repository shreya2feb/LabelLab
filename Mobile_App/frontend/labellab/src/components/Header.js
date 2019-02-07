import React, {Component} from 'react';
import { Container, Header, Title, Button, Icon, Left, Right, Body} from "native-base";

class MyHeader extends Component{
  render() {

    return (
    	<Container>
        <Header noShadow>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>LabelLab</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Right>
        </Header>
      </Container>
    );
  }
}
export default MyHeader;