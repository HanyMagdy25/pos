import React, { useState } from "react";
import "./ModalUser.css";
import { AiOutlineClose } from "react-icons/ai";
export default function ModalUser({ setModalUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { name, email, phone, country, city, address };

    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
    //   console.log("done");
      setModalUser(false)
      window.location.reload()
    });
  };
  return (
    <div className="modal-user">
      <div className="modal-content">
        <div className="modal-header">
          <span>Create Customer</span>
          <button onClick={() => setModalUser(false)}>
            <AiOutlineClose />
          </button>
        </div>
        <div className="modal-body">
          <div className="card">
            <div className="card-body">
              <form>
                <div className="row-form-user">
                  <div className="row-form-user-input">
                    <label className="form-label-user">Name</label>
                    <input
                      type="text"
                      placeholder="Enter Name"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="row-form-user-input">
                    <label className="form-label-user">Email</label>
                    <input
                      type="email"
                      placeholder="Enter Email"
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="row-form-user-input">
                    <label className="form-label-user">Phone Number</label>
                    <input
                      type="text"
                      placeholder="Enter Phone Number"
                      className="form-control"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="row-form-user-input">
                    <label className="form-label-user">Country</label>
                    <input
                      type="text"
                      placeholder="Enter Country"
                      className="form-control"
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                  <div className="row-form-user-input">
                    <label className="form-label-user">City</label>
                    <input
                      type="text"
                      placeholder="Enter City"
                      className="form-control"
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="row-form-user-input">
                    <label className="form-label-user">Address</label>
                    <input
                      type="text"
                      placeholder="Enter Address"
                      className="form-control"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  {/* buttons */}
                  <div className="row-form-user-btns">
                    <button className="btn-primary" onClick={handleSubmit}>
                      Save
                    </button>
                    <button
                      className="btn-cancel"
                      onClick={() => setModalUser(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
