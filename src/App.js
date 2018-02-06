import React from 'react';
import {
  Col,
  Container,
  Row,
} from 'reactstrap';
import './App.css';

import Encryptor from './components/Encryptor';

function App() {
  return (
    <Container className="App">
      <Row>
        <Col>
          <h1>String Encryptor</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Encryptor />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
