import styled from "styled-components";
import { useState } from "react";
import { useContext } from "react";
import { NightDayContext } from "../../context/NightDayProvider";

const StyledCard = styled.div`
  padding: 16px;
  border: 2px solid #536878;
  background-color: white;
  min-width: 1300px;
  margin: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
    rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
`;

const Plus = styled.div`
  color: green;
  font-size: 40px;
`;
const Minus = styled.div`
  color: red;
  font-size: 60px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 16px;
`;

const Subtitle = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
`;

const Card = ({ title, subtitle, children, description }) => {
  const [likes, setLikes] = useState(0);
  const { isNight } = useContext(NightDayContext);
  return (
    <StyledCard
      style={{
        background: isNight ? "black" : "#ffffff",
        color: isNight ? "white" : "grey",
      }}
    >
      <div>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        <Subtitle>{description}</Subtitle>
        {children}
      </div>
      <div>
        <Plus onClick={() => setLikes(likes + 1)}>+</Plus>
        <Minus onClick={() => setLikes(likes - 1)}>-</Minus>
        <span style={{ fontSize: "20px" }}>{likes}</span>
      </div>
    </StyledCard>
  );
};

export default Card;
