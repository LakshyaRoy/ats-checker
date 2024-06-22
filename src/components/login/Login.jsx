import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { styled } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { userState } from "../../redux/authSlice";

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  padding: "2rem",
  borderRadius: "8px",
});

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "100%",
});

const StyledHeading = styled("h1")({
  textAlign: "left",
  color: "#333",
  fontSize: "3rem",
  fontWeight: "bold",
  marginBottom: "1rem",
});

const StyledParagraph = styled("p")({
  textAlign: "left",
  color: "#666",
  fontSize: "1.2rem",
  marginBottom: "1rem",
});

const StyledButton = styled(Button)({
  marginTop: "1rem",
  backgroundColor: "#1976d2",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#115293",
  },
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onSubmitHandle = (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = {};

    if (email === "") {
      newErrors.email = "Email is required";
      toast.error("Email is required");
      valid = false;
    }

    if (email !== "" && !validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
      toast.error("Please enter a valid email");
      valid = false;
    }

    if (password === "") {
      newErrors.password = "Password is required";
      toast.error("Password is required");
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) {
      return;
    }

    const users = JSON.parse(localStorage.getItem("users"));
    console.log(users);
    if (users === null) {
      return toast.error("No user found. Please sign up.");
    }

    const emailExist = users.find((user) => user.email === email)?.email;
    const passwordExist = users.find(
      (user) => user.password === password
    )?.password;

    if (emailExist && passwordExist) {
      dispatch(userState(true));
      navigate("/");
    } else {
      toast.error("No user found. Please sign up.");
    }
  };

  return (
    <StyledContainer maxWidth="sm">
      <StyledBox
        component={"form"}
        noValidate
        autoComplete="off"
        onSubmit={onSubmitHandle}
      >
        <StyledHeading>Welcome Back</StyledHeading>
        <StyledParagraph>
          Welcome back! Please enter your details.
        </StyledParagraph>

        <TextField
          required
          label="Email"
          placeholder="Abc@gmail.com"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          type="email"
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          required={true}
          label="Password"
          placeholder="Enter Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value.toLowerCase())}
          error={!!errors.password}
          helperText={errors.password}
        />

        <StyledButton variant="contained" fullWidth type="submit">
          Login
        </StyledButton>

        <StyledParagraph sx={{ textAlign: "center" }}>
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign Up here!
          </Link>
        </StyledParagraph>
      </StyledBox>
      <ToastContainer />
    </StyledContainer>
  );
};

export default Login;
