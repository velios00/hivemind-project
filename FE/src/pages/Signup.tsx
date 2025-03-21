import {
  Avatar,
  Container,
  Grid2 as Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { useState, ChangeEvent, useCallback, FormEvent } from "react";
import { AuthRequest } from "../shared/models/AuthRequest.model";
import toast from "react-hot-toast";
import { Link as RouterLink } from "react-router-dom";
import { SignUpData } from "../shared/models/SignUpData.model";
import { signUp } from "../services/AuthService";

export default function Signup() {
  //stato per i dati del form
  const [signUpData, setSignUpData] = useState<SignUpData>({
    username: {
      value: "",
      isDirty: false,
      validateCriteria: (value: string) => {
        if (value.length === 0) return "Username can't be empty";
        return "";
      },
    },
    password: {
      value: "",
      isDirty: false,
      validateCriteria: (value: string) => {
        if (value.length === 0) return "Password can't be empty";
        if (
          value.length !== 0 &&
          signUpData.confirmPassword.value.length !== 0 &&
          value !== signUpData.confirmPassword.value
        )
          return "Passwords don't match";
        return "";
      },
    },
    confirmPassword: {
      value: "",
      isDirty: false,
      validateCriteria: (value: string) => {
        if (value.length === 0) return "Confirm password can't be empty";
        if (
          value.length !== 0 &&
          signUpData.confirmPassword.value.length !== 0 &&
          value !== signUpData.password.value
        )
          return "Passwords don't match";
        return "";
      },
    },
  });

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const updatedFormData: SignUpData = { ...signUpData };
      //cast per far si che updateFormData accetti un key di SignupData
      //inoltre rinomino gli id per far si che combacino con le chiavi di SignupData
      const changedIdInput = event.target.id as keyof SignUpData;
      updatedFormData[changedIdInput].value = event.target.value;
      if (!updatedFormData[changedIdInput].isDirty)
        updatedFormData[changedIdInput].isDirty = true;
      setSignUpData(updatedFormData);
    },
    [signUpData]
  );

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      const authRequest: AuthRequest = {
        username: signUpData.username.value,
        password: signUpData.password.value,
      };
      signUp(authRequest).then(() => {
        toast.success("User created successfully");
      });
    },
    [signUpData]
  );

  return (
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
        <Avatar
          sx={{
            mx: "auto",
            bgcolor: "secondary.main",
            textAlign: "center",
            mb: 1,
          }}
        ></Avatar>
        <Typography component="h1" variant="h5" align="center">
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        ></Box>
        <TextField
          id="username"
          placeholder="Enter Username"
          margin="normal"
          required
          fullWidth
          value={signUpData.username.value}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          id="password"
          placeholder="Enter Password"
          margin="normal"
          required
          fullWidth
          value={signUpData.password.value}
          onChange={handleInputChange}
          type="password"
        />
        <TextField
          id="confirmPassword"
          placeholder="Confirm Password"
          margin="normal"
          required
          fullWidth
          value={signUpData.confirmPassword.value}
          onChange={handleInputChange}
          type="password"
        />

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ mt: 1, backgroundColor: "#CC81C7" }}
        >
          Sign Up
        </Button>
      </Paper>
    </Container>
  );
}
