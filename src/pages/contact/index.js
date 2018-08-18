import React from "react";
import {Main, TransitionContainer, Meta, FormLabel, FormTextarea, FormInput, FormButton, Opener} from '../../styled-components';
// import { encode } from "../../utils/helpers";
import { navigateTo } from "gatsby-link";

const encode = (data) => {
    return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default class Contact extends React.Component {
    state = { 
        name: '',
        email: '',
        message: '',
        formSent: false,
        formSendError: false,
        submitting: false
    };

    render() {
        const {formSent, formSendError, submitting, name, email, message} = this.state;
        return (
            <Main>
                <TransitionContainer>
                    {formSendError && <Opener>There was an error sending your message... please try again later. {Object.keys(formSendError)}</Opener>}
                    {formSent && <Opener>Thanks for your message! I'll get back to you as soon as possible.</Opener>}
                    <form name="contact" method="post" data-netlify="true" className="grid-form" onSubmit={this.handleSubmit} action="/contact">
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
                            value={name}
                            gridArea={{
                                from : '1 / 2',
                                to: '2 / 3'
                            }}
                            onChange={this.handleChange}
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
                            value={email}
                            gridArea={{
                                from : '2 / 2',
                                to: '3 / 3'
                            }}
                            onChange={this.handleChange}
                        />
                        <FormLabel
                            gridArea={{
                                from : '3 / 1',
                                to: '4 / 2'
                            }}
                        >What you got?</FormLabel>
                        <FormTextarea
                            name="message"
                            value={message}
                            gridArea={{
                                from : '3 / 2',
                                to: '4 / 3'
                            }}
                            onChange={this.handleChange}   
                        />
                        <FormButton
                            type="submit"
                            disabled={submitting}
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


    handleChange = e => {
        this.setState({ 
            [e.target.name]: e.target.value 
        });
    };

    handleSubmit = e => {
        const {name, email, message} = this.state;

        this.setState({
            formSent: false,
            formSendError: false,
            submitting: true
        })

        const encoding = encode({
            'form-name': 'contact',
            name, email, message
        })



        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encoding
        })
        .then(() => {
            this.setState({
                formSent: true,
                name: '',
                email: '',
                message: '',
                submitting: false
            })
        })
        .catch((err) => {
            console.log(err)
            this.setState({
                formSendError: err,
                submitting: false
            })
        });

        e.preventDefault();

    };
}
