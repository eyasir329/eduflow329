import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const ContactUs = (props) => {
  console.log(props)

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(process.env.REACT_APP_EMAILJS_EMAIL_SERVICE_ID, process.env.REACT_APP_EMAILJS_EMAIL_TEMPLATE_ID, form.current, {
        publicKey: process.env.REACT_APP_EMAILJS_EMAIL_PUBLIC_KEY,
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <>
    {/* // <form ref={form} onSubmit={sendEmail}>
    //   <label>Name</label>
    //   <input type="text" name="user_name" />
    //   <label>Email</label>
    //   <input type="email" name="user_email" />
    //   <label>Message</label>
    //   <textarea name="message" />
    //   <input type="submit" value="Send" />
    // </form> */}
    </>
    
  );
};
