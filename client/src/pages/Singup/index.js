import Navbar from "../../components/Navbar/Navbar";
import DefaultLayout from "../../layouts/DefaultLayout";
import CenterLayout from "../../layouts/CenterLayout";
import Heading from "../../components/Heading";
import SingUpForm from "../../components/Singupform";
import { useContext } from "react";
import { NightDayContext } from "../../context/NightDayProvider";

const SingUp = () => {
  const { isNight } = useContext(NightDayContext);

  return (
    <>
      <Navbar />
      <DefaultLayout
        style={{
          background: isNight ? "black" : "white",
        }}
      >
        {" "}
        <Heading>Sing up</Heading>
      </DefaultLayout>
      <CenterLayout
        style={{
          background: isNight ? "black" : "white",
        }}
      >
        <SingUpForm>Sing Up</SingUpForm>
      </CenterLayout>
    </>
  );
};

export default SingUp;
