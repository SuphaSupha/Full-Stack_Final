import DefaultLayout from "../../layouts/DefaultLayout";
import Navbar from "../../components/Navbar/Navbar";
import EditForm from "../../components/EditComment";
import { useContext } from "react";
import { NightDayContext } from "../../context/NightDayProvider";

const Edit = () => {
  const { isNight } = useContext(NightDayContext);

  return (
    <>
      <Navbar title="Sing up" subtitle="Log in"></Navbar>
      <DefaultLayout style={{ background: isNight ? "black" : "#ffffff" }}>
        <EditForm />
      </DefaultLayout>
    </>
  );
};

export default Edit;
