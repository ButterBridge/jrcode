import React from "react";
import { navigateTo } from "gatsby-link";
import {Main, TransitionContainer, Meta, FormLabel, FormTextarea, FormInput, FormButton} from '../../styled-components';

const RECAPTCHA_KEY = process.env.SITE_RECAPTCHA_KEY;

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default class Contact extends React.Component {
state = { name: "", email: "", message: "" };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };



  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
      })
    })
      .then(() => navigateTo(form.getAttribute("action")))
      .catch(error => alert(error));
  };

  render() {
    return (
        <Main>
            <TransitionContainer>
                <form name="contact" method="post" data-netlify="true" className="grid-form">
                    <input type="hidden" name="form-name" value="contact" />
                    <FormLabel
                        gridArea={{
                            from : '1 / 1',
                            to: '2 / 2'
                        }}
                    >Name please!</FormLabel>
                    <FormInput 
                        type="text"
                        name="name"
                        gridArea={{
                            from : '1 / 2',
                            to: '2 / 3'
                        }}
                    />
                    <FormLabel
                        gridArea={{
                            from : '2 / 1',
                            to: '3 / 2'
                        }}
                    >Contact email:</FormLabel>
                    <FormInput 
                        type="email"
                        name="email"
                        gridArea={{
                            from : '2 / 2',
                            to: '3 / 3'
                        }}
                    />
                    <FormLabel
                        gridArea={{
                            from : '3 / 1',
                            to: '4 / 2'
                        }}
                    >What you got?</FormLabel>
                    <FormTextarea
                        name="message"
                        gridArea={{
                            from : '3 / 2',
                            to: '4 / 3'
                        }}    
                    />
                    <FormButton 
                        type="submit"
                        gridArea={{
                            from : '4 / 1',
                            to: '5 / 3'
                        }} 
                    >
                        Send
                    </FormButton>
                </form>
            </TransitionContainer>
        </Main>
    );
  }
}
