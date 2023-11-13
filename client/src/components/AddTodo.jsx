import axios from "axios";
import React, { useState } from 'react';

function AddTodo({ open }) {

    const [form, setForm] = useState({
        name: "",
        describe: ""
    })
    function handleChangeFrom(e) {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    }
    console.log(open)
    const submitFrom = async (e) => {
        e.preventDefault();
        console.log("Submitting form...");

        try {
            await axios.post("http://localhost:8080/api/todo/addTodo", {
                name: form.name,
                describe: form.describe,
            }).then(res=>{window.location.reload()});
            console.log("Form submitted successfully.");
        } catch (error) {
            console.error("Error submitting form:", error);
        }

    };

    return (
        <div className="fixed mt-2">
            <form div className="border-4 border-green-500 shadow-md rounded-md px-2 py-2">
                <div >
                    <input type="text" name="name" className='border-2 border-black mt-1 rounded-md placeholder:text-black' placeholder="What you gonna do?" onChange={handleChangeFrom} />
                </div>
                <div>
                    <input type="text" name="describe" className='border-2 mt-2 border-black rounded-md placeholder:text-black' placeholder="describe?" onChange={handleChangeFrom} />
                </div>
                <button className='border-2 border-green-500 rounded-md my-1 bg-green-300' onClick={submitFrom}>submit</button>
            </form>
        </div>
    )
}

export default AddTodo