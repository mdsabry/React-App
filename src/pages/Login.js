import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar, SnackbarContent } from "@mui/material";

function Login() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passRef = useRef();

  const [snack, setSnack] = useState(false);

  function login(e) {
    e.preventDefault();
    if (
      localStorage.getItem("email") === emailRef.current.value &&
      localStorage.getItem("password") === passRef.current.value
    ) {
      navigate("/labtopi");
    } else {
      setSnack(true);
    }
  }

  return (
    <div class="wrapper">
      <div className="form-section">
        <h2>Sign in </h2>
        <form onSubmit={(e) => login(e)}>
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
              ref={passRef}
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div class="input-box button">
            <input type="Submit" value="Login" />
          </div>
          <div class="text">
            <h3>
              Don't have an account?{" "}
              <strong
                style={{ color: "#0000ff", cursor: "pointer" }}
                onClick={() => navigate("/labtopi/register")}
              >
                Register now
              </strong>
            </h3>
          </div>
        </form>
      </div>
      <Snackbar
        open={snack}
        autoHideDuration={2000}
        onClose={() => {
          setSnack(false);
        }}
        message="Email or password not correct"
      >
        <SnackbarContent
          message={
            <span style={{ color: "white" }}>
              Email or Password not correct
            </span>
          }
        />
      </Snackbar>
    </div>
  );
}

export default Login;
