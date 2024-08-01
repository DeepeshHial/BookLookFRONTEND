import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBook = () => {
  const [data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

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
        const response = await axios.put(`https://booklook-wzjh.onrender.com/api/v1/edit-book`, data, { headers });
        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
        });
        alert(response.data.message);
        navigate(`/books-details/${id}`);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`https://booklook-wzjh.onrender.com/api/v1/getbyid/${id}`);
      setData(response.data.data);
    };
    fetch();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  return (
    <div className="max-w-2xl p-4 mx-auto mt-10 sm:mt-12 lg:mt-16">
      <h1 className="mb-6 text-2xl font-bold text-center sm:text-3xl">Update Book</h1>
      <div className="space-y-6">
        <div>
          <label htmlFor="url" className="block text-lg font-semibold text-gray-700 sm:text-xl">Image URL</label>
          <input
            type="text"
            id="url"
            name="url"
            placeholder="URL of your book image"
            required
            value={data.url}
            onChange={change}
            className="block w-full px-3 py-2 mt-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
          />
        </div>
        <div>
          <label htmlFor="title" className="block text-lg font-semibold text-gray-700 sm:text-xl">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            required
            value={data.title}
            onChange={change}
            className="block w-full px-3 py-2 mt-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-lg font-semibold text-gray-700 sm:text-xl">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Author"
            required
            value={data.author}
            onChange={change}
            className="block w-full px-3 py-2 mt-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-lg font-semibold text-gray-700 sm:text-xl">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            required
            value={data.price}
            onChange={change}
            className="block w-full px-3 py-2 mt-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
          />
        </div>
        <div>
          <label htmlFor="desc" className="block text-lg font-semibold text-gray-700 sm:text-xl">Description</label>
          <textarea
            id="desc"
            name="desc"
            placeholder="Description"
            required
            value={data.desc}
            onChange={change}
            className="block w-full px-3 py-2 mt-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
          />
        </div>
        <div>
          <label htmlFor="language" className="block text-lg font-semibold text-gray-700 sm:text-xl">Language</label>
          <input
            type="text"
            id="language"
            name="language"
            placeholder="Language"
            required
            value={data.language}
            onChange={change}
            className="block w-full px-3 py-2 mt-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
          />
        </div>
        <div className="text-center">
          <button
            className='w-full px-4 py-2 mt-3 font-semibold text-white transition duration-300 bg-gray-400 rounded-lg hover:bg-orange-500 sm:w-auto'
            onClick={submit}
          >
            Update Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateBook;
