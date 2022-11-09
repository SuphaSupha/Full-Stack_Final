import Navbar from "../../components/Navbar/Navbar";
import DefaultLayout from "../../layouts/DefaultLayout";
import CustomForm from "../../components/CustomForm/index";
import Button from "../../components/Button";
import { NightDayContext } from "../../context/NightDayProvider";
import { useContext } from "react";
import { CommentContext } from "../../context/CommentProvider";
import Card from "../../components/Card";
import { useParams } from "react-router-dom";

const Comments = () => {
  const { isNight } = useContext(NightDayContext);
  const { comments } = useContext(CommentContext);

  const { id } = useParams();
  const text = comments.find((text) => text.id === Number(id));

  const deleteFunction = (id) => {
    fetch("http://localhost:8080/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(text),
    });
  };

  return (
    <>
      <Navbar title="Sing up" subtitle="Log in"></Navbar>
      <DefaultLayout style={{ background: isNight ? "black" : "#ffffff" }}>
        <CustomForm />
      </DefaultLayout>
      <DefaultLayout style={{ background: isNight ? "black" : "#ffffff" }}>
        <Card key={text.id}>
          <h1>{text.name}</h1>
          <h1>{text.description}</h1>
          <Button type="contained" onClick={() => deleteFunction(text.id)}>
            Delete
          </Button>
        </Card>
      </DefaultLayout>
    </>
  );
};

export default Comments;
