import React, { useState } from 'react';
import axios from "axios";

const AddBooksAdmin = () => {
  const [data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        data.url === "" ||
        data.title === "" ||
        data.author === "" ||
        data.price === "" ||
        data.desc === "" ||
        data.language === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.post(`https://booklook-wzjh.onrender.com/api/v1/add-book`, data, { headers });
        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
        });
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="max-w-2xl p-4 mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-center">Add Book</h1>
      <div className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-2xl font-semibold text-gray-700">Image</label>
          <input
            type="text"
            id="url"
            name="url"
            placeholder="Url of your book image"
            required
            value={data.url}
            onChange={change}
            className="block w-full px-3 py-2 mt-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="title" className="block text-2xl font-semibold text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            required
            value={data.title}
            onChange={change}
            className="block w-full px-3 py-2 mt-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-2xl font-semibold text-gray-700">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Author"
            required
            value={data.author}
            onChange={change}
            className="block w-full px-3 py-2 mt-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-2xl font-semibold text-gray-700">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            required
            value={data.price}
            onChange={change}
            className="block w-full px-3 py-2 mt-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="desc" className="block text-2xl font-semibold text-gray-700">Description</label>
          <textarea
            id="desc"
            name="desc"
            placeholder="Description"
            required
            value={data.desc}
            onChange={change}
            className="block w-full px-3 py-2 mt-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="language" className="block text-2xl font-semibold text-gray-700">Language</label>
          <input
            type="text"
            id="language"
            name="language"
            placeholder="Language"
            required
            value={data.language}
            onChange={change}
            className="block w-full px-3 py-2 mt-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="text-center">
       <button className='mt-3 px-2 py-2 bg-zinc-400 text-[15px] font-semibold  rounded-lg bg-opacity-50 backdrop-blur hover:bg-orange-500 hover:text-white transition duration-300 border w-full' onClick={submit} >
Add book
</button>
        </div>
      </div>
    </div>
  );
}

export default AddBooksAdmin;



