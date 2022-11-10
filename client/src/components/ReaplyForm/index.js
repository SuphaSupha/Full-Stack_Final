import { useState, useContext } from "react";
import Button from "../Button";
import { NightDayContext } from "../../context/NightDayProvider";
import styled from "styled-components";

const StyledCont = styled.div`
  min-height: 213px;
`;

const StyledForm = styled.form`
  margin-left: 10px;
`;

const StyledTextarea = styled.textarea`
  width: 1336px;
  border-radius: 6px;
`;

const ReaplyForm = () => {
  const [answer, setAnswer] = useState("");
  const { isNight } = useContext(NightDayContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const answers = { answer: answer };

    fetch("http://localhost:8080/answers", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(answers),
    })
      .then(() => {
        console.log(answers);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <StyledCont style={{ background: isNight ? "black" : "#ffffff" }}>
      <StyledForm onSubmit={handleSubmit}>
        <StyledTextarea
          style={{
            background: isNight ? "#191919" : "#ffffff",
            border: isNight ? "none" : "1px solid grey",
            color: isNight ? "white" : "grey",
          }}
          type="text"
          required
          placeholder="Answer"
          rows="5"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <Button type="contained">Reaply</Button>
      </StyledForm>
    </StyledCont>
  );
};
export default ReaplyForm;
