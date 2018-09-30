import React from "react";
import PT from "prop-types";
import { window } from "browser-monads";
import {
  Main,
  TransitionContainer,
  FormLabel,
  FormTextarea,
  FormInput,
  FormButton,
  Opener,
  Paragraph,
  SuperTitle
} from "../../styled-components";
import { GameContext } from "../../contexts/GameContext";
import { encode } from "../../utils/helpers";

export default class Contact extends React.Component {
  state = {
    name: "",
    email: "",
    message: "",
    formSent: false,
    formSendError: false,
    submitting: false
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    const { name, email, message } = this.state;

    this.setState({
      formSent: false,
      formSendError: false,
      submitting: true
    });

    const encoding = encode({
      "form-name": "contact",
      name,
      email,
      message
    });

    window
      .fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encoding
      })
      .then(() => {
        this.setState({
          formSent: true,
          name: "",
          email: "",
          message: "",
          submitting: false
        });
      })
      .catch(err => {
        this.setState({
          formSendError: err,
          submitting: false
        });
      });

    e.preventDefault();
  };

  render() {
    const {
      formSent,
      formSendError,
      submitting,
      name,
      email,
      message
    } = this.state;
    const {
      data: {
        site: {
          siteMetadata: { title }
        }
      }
    } = this.props;
    return (
      <GameContext.Consumer>
        {({ colours }) => (
          <Main>
            <TransitionContainer>
              <SuperTitle colour={colours[title.length]}>Contact</SuperTitle>
              <Paragraph>
                Please get in contact here to ask about work & anything else
                interesting :)
              </Paragraph>
              <Paragraph>
                If you are interested in Northcoders (the coding bootcamp in
                Manchester, UK), please contact us via
                <a
                  href="https://northcoders.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {` our website.`}
                </a>
              </Paragraph>
              {formSendError && (
                <Opener>
                  There was an error sending your message... please try again
                  later.
                </Opener>
              )}
              {formSent && (
                <Opener>
                  Thanks for your message! I will get back to you as soon as
                  possible.
                </Opener>
              )}
              <form
                name="contact"
                method="post"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={this.handleSubmit}
                className="grid-form"
              >
                <input type="hidden" name="form-name" value="contact" />
                <p hidden>
                  <input name="bot-field" onChange={this.handleChange} />
                </p>
                <FormLabel
                  gridArea={{
                    from: "1 / 1",
                    to: "2 / 2"
                  }}
                >
                  Your name:
                </FormLabel>
                <FormInput
                  type="text"
                  name="name"
                  onChange={this.handleChange}
                  value={name}
                  gridArea={{
                    from: "1 / 2",
                    to: "2 / 3"
                  }}
                />
                <FormLabel
                  gridArea={{
                    from: "2 / 1",
                    to: "3 / 2"
                  }}
                >
                  Your email:
                </FormLabel>
                <FormInput
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  gridArea={{
                    from: "2 / 2",
                    to: "3 / 3"
                  }}
                />
                <FormLabel
                  gridArea={{
                    from: "3 / 1",
                    to: "4 / 2"
                  }}
                >
                  Message:
                </FormLabel>
                <FormTextarea
                  name="message"
                  onChange={this.handleChange}
                  value={message}
                  gridArea={{
                    from: "3 / 2",
                    to: "4 / 3"
                  }}
                />
                <FormButton
                  type="submit"
                  disabled={submitting || !name || !email || !message}
                  gridArea={{
                    from: "4 / 2",
                    to: "5 / 3"
                  }}
                >
                  Send
                </FormButton>
              </form>
            </TransitionContainer>
          </Main>
        )}
      </GameContext.Consumer>
    );
  }
}

Contact.propTypes = {
  data: PT.object.isRequired
};

export const pageQuery = graphql`
  query ContactQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
