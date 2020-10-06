import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ContactForm = () => {
  const [data, setData] = useState();
  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data) => {
    setData(data);
  };

  // changed messageField required to true and made email be required to be an email and increased field length of first name

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name*</label>
          <input
            name="firstName"
            placeholder="Edd"
            data-testid="firstNameField"
            ref={register({ required: true, maxLength: 30 })}
          />
          {errors.firstName && (
            <p data-testid="firstNameError">Looks like there was an error: {errors.firstName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName">Last Name*</label>
          <input
            name="lastName"
            placeholder="Burke"
            data-testid="lastNameField"
            ref={register({ required: true })} 
          />
          {errors.lastName && (
            <p data-testid="lastNameError">Looks like there was an error: {errors.lastName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" placeholder="bluebill1049@hotmail.com">
            Email*
          </label>
          <input name="email" data-testid="emailField" type="email" ref={register({ required: true })} />
          {errors.email && (
            <p data-testid="emailError">Looks like there was an error: {errors.email.type}</p>
          )}
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea name="message" data-testid="messageField" ref={register({ required: true })} />
          {errors.message && (
            <p data-testid="messageError">Looks like there was an error: {errors.message.type}</p>
          )}
        </div>
        {data && (
          <pre data-testid="JSON" style={{ textAlign: "left", color: "white" }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
        <input type="submit" data-testid="submit" />
      </form>
    </div>
  );
};

export default ContactForm;
