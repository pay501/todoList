import axios from "axios";
import { useEffect, useState } from 'react';
import AddTodo from "./components/AddTodo";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [open, setOpen] = useState(false)
  const right = "https://cdn-icons-png.flaticon.com/128/6785/6785304.png"
  const notRight = "https://cdn-icons-png.flaticon.com/128/1442/1442912.png"

  useEffect(() => {
    axios.get("http://localhost:8080/api/todo/getAll")
      .then(res => {
        if (res.data) {
          setTodoList(res.data);
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const doneBtn = (id) => {
    console.log(id)
    axios.put(`http://localhost:8080/api/todo/updateDone/${id}`).then(
      res => {
        window.location.reload();
      }
    )
  }
  const openAddTodo = (e) => {
    setOpen(true)
  }

  const deleteBtn = (id) => {
    axios.delete(`http://localhost:8080/api/todo/deleteTodo/${id}`).
      then(res => {
        window.location.reload();
      })
  }

  return (
    <div className="main-container">
      <div className="body-container">
        <div>
          <button className="border-2 border-black rounded-md bg-blue-400 mt-4 w-full" onClick={openAddTodo}>Add new todo!</button>
        </div>
        {
          open ? <AddTodo open={open} /> : <div></div>
        }
        <table className=" border-spacing-2 border-separate w-full h-80vh">
          <thead >
            <tr className="">
              <th className="border-2 border-black rounded-md">No</th>
              <th className="border-2 border-black rounded-md">Activity</th>
              <th className="border-2 border-black rounded-md">CreatedAt</th>
              <th className="border-2 border-black rounded-md">Progress</th>
              <th className="border-2 border-black rounded-md">Operation</th>
            </tr>
          </thead>
          <tbody>
            {
              todoList.map((val, index) => (
                <tr key={val._id}>
                  <td className="
                    border-2 border-black rounded-md py-2
                    text-center font-serif text-xl font-bold
                    h-10
                  ">
                    {index + 1}
                  </td>
                  
                  <td className="
                    border-2 border-black rounded-md
                    text-center  text-xl font-bold
                    flex h-10
                  ">
                    {
                      val.done ?
                      <img src={right} className="h-5 w-5 mt-2 ml-2" />
                      :<img src={notRight} alt="" className="h-5 w-5 mt-2 ml-2 bg-red-400 rounded-full" />
                    }
                    <span className="ml-2">{val.name}</span>
                  </td>
                  
                  <td className="
                    border-2 border-black rounded-md
                    text-center  text-xl font-bold
                    h-10
                  ">
                    {val.createdAt.slice(0, 10)}
                  </td>

                  <td className="
                    border-2 border-black rounded-md
                    text-center text-xl font-semibold
                    h-10
                  ">

                    {
                      val.done ?
                        <div>
                          Done!
                          <button className="border-2 rounded-md bg-red-300 ml-2" onClick={() => doneBtn(val._id)}>NOT YET</button>
                        </div>
                        : <div>
                          Have not done!.
                          <button className="border-2 rounded-md bg-green-300 ml-2" onClick={() => doneBtn(val._id)}>Finish</button>
                        </div>
                    }
                  </td>
                  <td className="
                    border-2 border-black rounded-md
                    text-center text-xl font-semibold
                  ">
                    <button onClick={() => { deleteBtn(val._id) }}>delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;