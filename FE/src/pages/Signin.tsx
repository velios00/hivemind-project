import {
  Avatar,
  Container,
  Grid2 as Grid,
  Paper,
  Typography,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const handleSubmit = () => {
  console.log("Submit");
};

export default function Signup() {
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
          placeholder="Enter Username"
          margin="normal"
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          placeholder="Enter Password"
          margin="normal"
          required
          fullWidth
          type="password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ mt: 1, backgroundColor: "#CC81C7" }}
        >
          Sign In
        </Button>
        <Grid>
          <Grid item>
            <Link component={RouterLink} to="/signup" variant="body2">
              Dont have an account? Sign up!
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
