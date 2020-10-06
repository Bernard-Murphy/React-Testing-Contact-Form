import React from "react";
import { render, fireEvent, cleanup, waitFor } from "@testing-library/react";
import App from "./App";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";

describe('App', () => {
  afterEach(cleanup);
  it ('displays the form', () => {
    const nonEmail = "fsajkfdsa";
    const yesEmail = "lilmilk@gmail.com";
    const validate = (email) => {
      const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i
    
      return expression.test(String(email).toLowerCase())
    }
    const { getByTestId } = render(<App />);
    const button = getByTestId("submit");
    const firstNameField = getByTestId("firstNameField");
    const lastNameField = getByTestId("lastNameField");
    const emailField = getByTestId("emailField");
    const messageField = getByTestId("messageField");
    expect(firstNameField).toBeInTheDocument();
    expect(lastNameField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(messageField).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  })

  it ("tests the fields", () => {
    const { getByTestId } = render(<App />);
    const firstNameField = getByTestId("firstNameField");
    const lastNameField = getByTestId("lastNameField");
    const emailField = getByTestId("emailField");
    const messageField = getByTestId("messageField");
    firstNameField.value = "Bernard";
    lastNameField.value = "Murphy";
    emailField.value = "lilmilk@gmail.com";
    messageField.value = "hello";
    fireEvent.change(firstNameField);
    fireEvent.change(lastNameField);
    fireEvent.change(emailField);
    fireEvent.change(messageField);
    expect(firstNameField).toHaveValue("Bernard");
    expect(lastNameField).toHaveValue("Murphy");
    expect(emailField).toHaveValue("lilmilk@gmail.com");
    expect(messageField).toHaveValue("hello");
  })

  it("error tests the form", async () => {
    const { getByTestId } = render(<App />);
    const button = getByTestId("submit");
    await act(async () => {
      fireEvent.click(button);
    })

    
    const firstNameError = getByTestId("firstNameError");
    const lastNameError = getByTestId("lastNameError");
    const emailError = getByTestId("emailError");
    const messageError = getByTestId("messageError");

    expect(firstNameError).toBeInTheDocument();
    expect(lastNameError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();
    expect(messageError).toBeInTheDocument();
  });

  it("ensures the form works properly when sumbitted properly", async () => {
    const { getByTestId } = render(<App />);
    const button = getByTestId("submit");
    const firstNameField = getByTestId("firstNameField");
    const lastNameField = getByTestId("lastNameField");
    const emailField = getByTestId("emailField");
    const messageField = getByTestId("messageField");
    firstNameField.value = "Bernard";
    lastNameField.value = "Murphy";
    emailField.value = "lilmilk@gmail.com";
    messageField.value = "hello";
    fireEvent.change(firstNameField);
    fireEvent.change(lastNameField);
    fireEvent.change(emailField);
    fireEvent.change(messageField);
    await act(async () => {
      fireEvent.click(button);
    })

    const expectedOutput = "\{ \"firstName\": \"Bernard\", \"lastName\": \"Murphy\", \"email\": \"lilmilk@gmail.com\", \"message\": \"hello\" \}";

    const outputData = getByTestId("JSON");
    expect(outputData).toHaveTextContent(expectedOutput);
    
  });
})
