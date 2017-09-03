import React, { Component } from "react";
import logo from "./logo.svg";
import Dropzone from "react-dropzone";
import axios from "axios";
import UploadImageSideButton from './UploadImageSideButton';
import { Editor, createEditorState } from "medium-draft";
import { objectToFormData } from './constants'
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      editorState: createEditorState() // for empty content
    };
    this.sideButtons = [{
      title: 'Image',
      component: UploadImageSideButton,
    }];
  }
  handleDrop = acceptedFiles => {
    this.uploadWithDataObject(acceptedFiles);
  };

  uploadWithDataObject = acceptedFiles => {
    let data = {
      medium: {
        article_id: 1,
        user_id: 1,
        attachment: acceptedFiles[0]
      }
    };
    axios
      .post("http://localhost:3000/media", objectToFormData(data))
      .then(response => console.log(response));
  };

  onChange = editorState => {
    this.setState({ editorState });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
          <Dropzone onDrop={this.handleDrop} />
        </div>
        <div>
          <Editor
            ref="editor"
            editorState={this.state.editorState}
            onChange={this.onChange}
            sideButtons={this.sideButtons}
          />
        </div>
      </div>
    );
  }
}

export default App;
