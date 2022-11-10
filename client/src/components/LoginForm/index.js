import { useState } from "react";
import styled from "styled-components";
import Button from "../Button/index";
import { useContext } from "react";
import { NightDayContext } from "../../context/NightDayProvider";

const StyledForm = styled.form`
  text-align: center;
  border: 1px solid black;
  border-radius: 10px;
  width: 400px;
  height: 400px;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
    rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
`;
const Label = styled.label`
  font-size: 20px;
`;
const Input = styled.input`
  width: 120px;
`;

const LogInForm = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isNight } = useContext(NightDayContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = { email: email, password: password };
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(users),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.error) {
          alert("Wrong email or password");
        } else {
          localStorage.setItem("token", resp.token);
          alert("Log in sucssesfuly");
          console.log(JSON.stringify(resp.token));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <StyledForm
      onSubmit={handleSubmit}
      style={{
        border: isNight ? "2px solid white" : "1px solid black",
      }}
    >
      <Label>Email</Label>
      <Input
        type="email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <Label>Password</Label>
      <Input
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <Button type="contained">{children}</Button>
    </StyledForm>
  );
};

export default LogInForm;
