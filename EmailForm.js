import React from 'react';

import $ from 'jquery';

var self;

export default class EmailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', sendTo: '', subject: '', message: ''};

    //understanding and figuring out that I needed to bind this was so hard
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }

  componentDidMount() {
    self = this;

    // $('#submitButton').click(self.handleClick);

    //now I will format the labels and input elements
    var widthAvailable = $('#inputContainer').outerWidth();
    $('#inputContainer').css({ width: widthAvailable });
  }

  handleSubjectChange(event) {
    // console.log('in test')

    this.setState({subject: event.target.value});
  }

  handleMessageChange(event) {
    this.setState({message: event.target.value});
  }

  handleSubmit(event) {


    var messageBody = document.getElementById('messageBody').value;
    //sweet, now I have the messageBody next that was typed in the textarea element
    //now I need to use it and send it to the server so that an email can be sent
    // console.log('Email was submitted: ' +  messageBody);

    var finalObject = {
      subject: this.state.subject,
      messageBody: messageBody
    }
  


    //todo - finish this
    //What I probably need to do now is create a hidden form for
    //this page and use it to do a post when needing to send the
    //email on the node.js side of things rather than sending
    //this in the client


    self.post('/send', finalObject);



    event.preventDefault();
  }
  post(path, params, method) {
        method = method || "post"; // Set method to post by default if not specified.

        // The rest of this code assumes you are not using a library.
        // It can be made less wordy if you use one.
        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);

        for(var key in params) {
            if(params.hasOwnProperty(key)) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);

                form.appendChild(hiddenField);
             }
        }

        document.body.appendChild(form);
        form.submit();
  }

  render() {
    return (
      <div id="divFormId">
        <label id="inputContainer" style={styles.labelStyle}>

          <div>
            Subject:
          </div>
          <div>
            <input style={styles.subject} type="text" value={this.state.subject} onChange={this.handleSubjectChange} />
          </div>

          <br />

          <div>
            Message Body:
          </div>
          <div>
            <textarea style={styles.messageBody} id="messageBody"></textarea>
          </div>
          
        </label>
        
        <br />

        <button id="submitButton" style={styles.submit} onClick={this.handleSubmit.bind(this)}>Send</button>

        <br />

        
      </div>
    );
  }
}



var styles = {
  labelStyle: {
    fontSize: 20,
    color: 'white'
  },
  sendTo: {
    marginBottom: 5
  },
  subject: {
    width: 280,
    height: 50,
    fontSize: 33,
    marginBottom: 5,
    // float: 'right'
  },
  messageBody: {
    width: 200,
    height: 200,
    fontSize: 30,
    marginBottom: 5
  },
  submit: {
    cursor: 'pointer',
    fontSize: 18
  }
}
