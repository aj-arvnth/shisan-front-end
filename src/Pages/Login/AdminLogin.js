import React, { useState } from "react";
import * as Components from "../../Components/AdminComponents";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [signIn, toggle] = React.useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    await delay(10);
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const errors = {};

    if (formData.email.length > 0 && formData.email !== "admin@gmail.com") {
      errors.email = "Invalid email.";
    } else if (formData.email.length === 0) {
      errors.email = "Email is required";
    }

    if (formData.password.length > 0 && formData.password !== "pass") {
      errors.password = "Invalid password.";
    } else if (formData.password.length === 0) {
      errors.password = "Password is required.";
    }

    if (Object.keys(errors).length === 0) {
      if (
        formData.email === "admin@gmail.com" &&
        formData.password === "pass"
      ) {
        navigate("/");
      }
    }

    setFormErrors(errors);
  };

  return (
    <Components.Container>
      <Components.SignInContainer signinIn={signIn}>
        <Components.Form>
          <Components.Title>Admin Login</Components.Title>
          <Components.Input
            type="email"
            name="email"
            placeholder="Email : admin@gmail.com"
            value={formData.email}
            onChange={handleInputChange}
          />
          {formErrors.email && (
            <Components.ErrorMessage>
              {formErrors.email}
            </Components.ErrorMessage>
          )}
          <Components.Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {formErrors.password && (
            <Components.ErrorMessage>
              {formErrors.password}
            </Components.ErrorMessage>
          )}
          <Components.Button onClick={handleSignIn}>Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>

      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>
          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>Welcome admin!</Components.Title>
            <Components.Paragraph>
              Please fill in the necessary details to get connected.
            </Components.Paragraph>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}

export default AdminLogin;