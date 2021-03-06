import React, { Component } from 'react';
import { State, withStatechart } from 'react-automata';
import {
  Button,
  ButtonGroup,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

import statechart from './statechart';
import { allX, asciiShift } from '../lib/encryptionmethods';

class Encryptor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      encryptedString: '',
      sourceString: '',
      encryptionMethod: 'allX',
    };

    this.handleEncryptionMethodSubmit = this.handleEncryptionMethodSubmit.bind(this);
    this.handleEncryptionMethodChange = this.handleEncryptionMethodChange.bind(this);
    this.handleSourceSubmit = this.handleSourceSubmit.bind(this);
    this.handleSourceChange = this.handleSourceChange.bind(this);
  }

  handleEncryptionMethodSubmit(e) {
    e.preventDefault();
    this.props.transition('METHOD_SELECTED');
  }

  handleEncryptionMethodChange(e) {
    this.setState({
      encryptionMethod: e.target.value,
    });
  }

  handleSourceSubmit(e) {
    e.preventDefault();
    this.props.transition('SOURCE_ENTERED');
  }

  handleSourceChange(e) {
    this.setState({
      sourceString: e.target.value,
    });
  }

  runEncryption() {
    let result = this.state.sourceString;
    switch (this.state.encryptionMethod) {
      case 'allX':
        result = allX(result);
        break;
      case 'shiftOne':
        result = asciiShift(result, 1);
        break;
      case 'shiftThree':
        result = asciiShift(result, 3);
        break;
      default:
        break;
    }

    this.setState({
      encryptedString: result,
    });
  }

  render() {
    return (
      <div>
        <State value="1">
          <ButtonGroup>
            <Button
              onClick={() => {
                this.props.transition('EXIT_CLICKED');
              }}
            >
              <span aria-hidden>&times;</span>
            </Button>
            <Button
              onClick={
                () => this.props.transition('NEXT_CLICKED')
              }
            >
              Select string encryption method
            </Button>
          </ButtonGroup>
        </State>
        <State value="2">
          <Form onSubmit={this.handleEncryptionMethodSubmit}>
            <FormGroup>
              <Label for="encryptionmethod">Select One of the Available Encryption Methods:</Label>
              <Input
                onChange={this.handleEncryptionMethodChange}
                value={this.state.encryptionMethod}
                type="select"
                name="encryptionmethod"
                id="encryptionmethod"
                autoFocus
              >
                <option value="allX">Encryption Method A</option>
                <option value="shiftOne">Encryption Method B</option>
                <option value="shiftThree">Encryption Method C</option>
              </Input>
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </State>
        <State value="3">
          <Form onSubmit={this.handleSourceSubmit}>
            <FormGroup>
              <Label for="sourcestring">Enter the String to Encrypt:</Label>
              <Input
                onChange={this.handleSourceChange}
                value={this.state.sourceString}
                type="text"
                name="sourcestring"
                id="sourcestring"
                autoFocus
              />
            </FormGroup>
            <Button>Encrypt</Button>
          </Form>
        </State>
        <State value="4">
          <Button
            onClick={() => {
              this.props.transition('OPEN_MENU');
            }}
          >
            Encrypt
          </Button>
        </State>

        <State value={['1', '4']}>
          <h3>Source String: {this.state.sourceString}</h3>
          <h3>Encrypted String: {this.state.encryptedString}</h3>
          <p>State: {JSON.stringify(this.props.machineState, null, 2)}</p>
        </State>
      </div>
    );
  }
}

export default withStatechart(statechart)(Encryptor);
