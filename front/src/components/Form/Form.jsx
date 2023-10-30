import { useDebugValue } from "react";
import { useState } from "react";
import validation from "../Validation/validation";

const Form = ({ login }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
    setErrors(
      validation({ ...userData, [event.target.name]: event.target.value })
    );
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    login(userData);
  };
  return (
    <form>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark">
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase text-white">
                    Login
                  </h2>
                  <p className="text-white-50 mb-5">
                    Please enter your login and password!
                  </p>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      id="floatingInput"
                      placeholder="name@example.com"
                      value={userData.email}
                      onChange={handleChange}
                    ></input>
                    <label>Email address</label>
                    {errors.e1 ? (
                      <p>{errors.e1}</p>
                    ) : errors.e2 ? (
                      <p>{errors.e2}</p>
                    ) : (
                      <p>{errors.e3}</p>
                    )}
                  </div>

                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      value={userData.password}
                      onChange={handleChange}
                    ></input>
                    <label>Password</label>
                    {errors.p1 ? <p>{errors.p1}</p> : <p>{errors.p2}</p>}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-outline-danger"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
export default Form;
