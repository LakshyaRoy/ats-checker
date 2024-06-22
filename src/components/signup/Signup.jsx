import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import { styled } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";

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

const Signup = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.toLowerCase() });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;
    const newErrors = {};

    if (!name) {
      newErrors.name = "Name is required";
      toast.error("Name is required");
    }
    if (!email) {
      newErrors.email = "Email is required";
      toast.error("Email is required");
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      toast.error("Email is invalid");
    }
    if (!password) {
      newErrors.password = "Password is required";
      toast.error("Password is required");
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      toast.error("Password must be at least 6 characters");
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
      toast.error("Confirm Password is required");
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      toast.error("Passwords do not match");
    }

    return newErrors;
  };

  const localUsers = JSON.parse(localStorage.getItem("users"));
  const [users, setUsers] = useState(localUsers || []);

  const onSubmitHandle = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setUsers([...users, formData]);
      console.log(formData);
      toast.success("Signup successful");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      setErrors(newErrors);
    }
  };
  localStorage.setItem("users", JSON.stringify(users));

  return (
    <StyledContainer maxWidth="sm">
      <StyledBox
        component={"form"}
        noValidate
        autoComplete="off"
        ref={formRef}
        onSubmit={onSubmitHandle}
      >
        <StyledHeading>Create your account</StyledHeading>
        <StyledParagraph>Create your account here.</StyledParagraph>
        <TextField
          label="Name"
          placeholder="Enter Name"
          fullWidth
          required
          name="name"
          id="name"
          value={formData.name}
          onChange={onChangeHandle}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Email"
          placeholder="Abc@gmail.com"
          fullWidth
          required
          name="email"
          id="email"
          value={formData.email}
          onChange={onChangeHandle}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          required={true}
          label="Password"
          placeholder="Enter Password"
          type="password"
          name="password"
          id="password"
          fullWidth
          value={formData.password}
          onChange={onChangeHandle}
          error={!!errors.password}
          helperText={errors.password}
        />
        <TextField
          label="Confirm Password"
          placeholder="Confirm Password"
          fullWidth
          required
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={onChangeHandle}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
        />
        <StyledButton variant="contained" fullWidth type="submit">
          Sign Up
        </StyledButton>
        <StyledParagraph sx={{ textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            {" "}
            Sign In here!
          </Link>
        </StyledParagraph>
      </StyledBox>
      <ToastContainer />
    </StyledContainer>
  );
};

export default Signup;
