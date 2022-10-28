import { Link } from "react-router-dom";
import styled from "styled-components";
import LogIn from "../LogIn";
// import { NightModeContext } from "../../contexts/NightModeProv";

const Container = styled.div`
  padding: 20px 80px;
  border-bottom: 2px solid #536878;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #add8e6;
`;

const Logo = styled.div`
  color: #eb5d05;
  font-size: 30px;
  font-weight: 800px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  margin: 0px 18px;
  color: #eb9605;

  &:hover {
    color: #eb5d05;
  }
`;
const RightContainer = styled.div`
  display: flex;
`;

const Navbar = () => {
  // const { isNightMode } = useContext(NightModeContext);
  return (
    <Container>
      <Logo>Forum</Logo>
      <RightContainer>
        <nav>
          {/* <LogIn>Log in</LogIn> */}
          <StyledLink to="/">Sing up</StyledLink>
          <StyledLink to="/medications">Log in</StyledLink>
        </nav>
        {/* <div onClick={toggle}>{isNightMode ? "Night" : "day"}</div> */}
      </RightContainer>
    </Container>
  );
};

export default Navbar;
