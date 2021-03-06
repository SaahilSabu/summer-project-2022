import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Application = () => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phno, setPhno] = useState("");
  const [address, setAddress] = useState("");
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const id = localStorage.getItem("id");

  useEffect(() => {
    const userFormData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.get(`/api/form/forminfo/${id}`, config);
        setFname(data.user.fname);
        setLname(data.user.lname);
        setPhno(data.user.phno);
        setAddress(data.user.address);
      } catch (error) {
        console.log(error);
      }
    };
    userFormData();
  }, []);

  const formHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.put(
        `/api/form/forminfo/${id}`,
        {
          fname,
          lname,
          phno,
          address,
        },
        config
      );
      setSuccess("Form Updated");
    } catch (error) {
      setError(error);
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 5000);
    }
  };

  const handleSubmit = () => {
    try {
      axios.put(`api/form/submit/${id}`);
      setSuccess("Submitted");
    } catch (error) {
      setError(error);
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 5000);
    }
  };

  return (
    <>
      {success ? (
        <div className="alert alert-success shadow-sm w-11/12 sm:w-1/2 m-auto">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{success}</span>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="flex justify-center  w-full m-auto my-6 p-4 border-2 border-gray-600 font-sans sm:w-1/2">
        <form onSubmit={formHandler} className="flex flex-col p-3">
          <h3 className="text-center p-3 text-3xl font-medium text-gray-700 mb-5 ">
            Form
          </h3>
          {error && (
            <div class="alert alert-error shadow-sm my-2 text-sm h-6">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="stroke-current flex-shrink-0 h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}
          <div className="w-56 mb-4 relative group">
            <label className="text-sm font-light" htmlFor="name">
              First Name:
            </label>
            <input
              className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
              type="text"
              required
              id="fname"
              placeholder="Enter first name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </div>
          <div className="w-56 mb-4 relative group">
            <label className="text-sm font-light" htmlFor="email">
              Last Name:
            </label>
            <input
              className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
              type="text"
              required
              id="lname"
              placeholder="Email last name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </div>
          <div className="w-56 mb-4 relative group">
            <label className="text-sm font-light" htmlFor="password">
              Phone Number:
            </label>
            <input
              className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
              type="number"
              required
              id="phno"
              autoComplete="true"
              placeholder="Enter phone number"
              value={phno}
              onChange={(e) => setPhno(e.target.value)}
            />
          </div>
          <div className="w-56 mb-4 relative group">
            <label className="text-sm font-light" htmlFor="confirmpassword">
              Address
            </label>
            <input
              className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
              type="text"
              required
              id="address"
              autoComplete="true"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="btn bg-green-800 hover:bg-green-700 text-white px-6 border-none "
            >
              Save
            </button>
            <button
              type="button"
              className="btn  bg-[#020493] hover:bg-[#0608c2] text-white px-6 border-none"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Application;
