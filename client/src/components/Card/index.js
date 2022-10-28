import styled from "styled-components";

const StyledCard = styled.div`
  padding: 16px;
  border: 2px solid #536878;
  background-color: white;
  margin: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
    rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
`;
const Divider = styled.div``;

const Plus = styled.div`
  color: green;
  font-size: 40px;
`;
const Minus = styled.div`
  color: red;
  font-size: 60px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 16px;
`;

const Subtitle = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
`;

const Description = styled(Subtitle)`
  margin-bottom: 16px;
`;

const Card = ({ title, subtitle, description, children }) => {
  return (
    <StyledCard>
      <Divider>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>

        {children}
      </Divider>
      <Divider>
        <Plus>+</Plus>
        <Minus>-</Minus>
      </Divider>
    </StyledCard>
  );
};

export default Card;
