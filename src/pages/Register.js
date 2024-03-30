import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  function register(e) {
    e.preventDefault();
    localStorage.setItem("name", nameRef.current.value);
    localStorage.setItem("email", emailRef.current.value);
    localStorage.setItem("password", passwordRef.current.value);
    navigate("/labtopi/login");
  }
  return (
    <div class="wrapper">
      <div className="form-section">
        <h2>Sign up </h2>
        <form onSubmit={(e) => register(e)}>
          <div class="input-box">
            <input
              ref={nameRef}
              type="text"
              placeholder="Enter your name"
              required
            />
          </div>
          <div class="input-box">
            <input
              ref={emailRef}
              type="text"
              placeholder="Enter your email"
              required
            />
          </div>
          <div class="input-box">
            <input
              ref={passwordRef}
              type="password"
              placeholder="Create password"
              required
            />
          </div>
          {/* <div class="input-box">
            <input type="password" placeholder="Confirm password" required />
          </div> */}
          {/* <div class="policy">
            <input type="checkbox" />
            <h3>I accept all terms & condition</h3>
          </div> */}
          <div class="input-box button">
            <input type="Submit" value="Register Now" />
          </div>
          <div class="text">
            <h3>
              Already have an account?
              <strong
                onClick={() => navigate("/labtopi/login")}
                style={{ color: "blue", cursor: "pointer" }}
              >
                {" "}
                Login now
              </strong>
            </h3>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Register;
