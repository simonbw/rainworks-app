import { Body, Container, Content, Header, Left, Right, Text, Title } from 'native-base';
import React from 'react';
import DrawerMenuButton from './DrawerMenuButton';

const AboutScreen = () => (
  <Container>
    <Header>
      <Left><DrawerMenuButton/></Left>
      <Body><Title>About</Title></Body>
      <Right/>
    </Header>
    <Content padder>
      <Text>This is some content on the about page.</Text>
    </Content>
  </Container>
);

AboutScreen.propTypes = {};

export default AboutScreen;