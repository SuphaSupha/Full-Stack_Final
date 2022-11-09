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

const SingUpForm = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isNight } = useContext(NightDayContext);

  // const register = (e) => {
  //   e.preventDefault();
  //   Axios.post("http://localhost:8080/register", {
  //     name: nameReg,
  //     password: passwordReg,
  //   }).then((response) => console.log(response));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = { email, password };

    fetch("http://localhost:8080/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(users),
    })
      .then(() => {
        console.log(users);
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
export default SingUpForm;
