import { useState } from "react";

const Form = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");

  //   const hendleAddTodo = (e) => {
  //     e.preventDefault();

  //     //[...todos]
  //     if (todoText.length >= 1) {
  //       setTodos((prevTodos) => [...prevTodos, todoText]); //prideda
  //       SetTodoText("");
  //       localStorage.setItem("Todos", JSON.stringify(...todoText, todos));
  //     }
  //     console.log(todoText);
  //   };

  return (
    <div>
      <div>
        <form>
          <label>Pet name:</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label>Description:</label>
          <input
            type="text"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <label>Date:</label>
          <input
            type="number"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <br />
          <label>Email:</label>
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <button>Add pet</button>
        </form>
      </div>
    </div>
  );
};
export default Form;
