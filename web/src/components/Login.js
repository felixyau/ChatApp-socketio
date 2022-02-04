//navigate("...", { replace: true })  so the user doesn't return to the login page when clicking the back button after logging in
import {
    Box,
    Container,
    Button,

  } from "@material-ui/core";
  import { makeStyles } from "@material-ui/core/styles";
  import axios from "axios";
  import { Form, Formik } from "formik";
  import React from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  import * as Yup from "yup";
  import Textfield from "./Textfield";
  import { getKeyFromPwd, validateLogin } from "./utils/handleLogin";
  
  const useStyles = makeStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      // alignItems: "center",
      border: "1px solid hsl(207,22%,80%)",
    },
    formContainer: {
      marginTop: "5vh",
      border: "1px solid hsl(207,22%,80%)",
      padding: "28px",
    },
    link: {
      "&:hover": {
        cursor: "pointer",
      },
    },
  });
  
  
  export default function Login() {
  
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
  
    const [open, setOpen] = React.useState(false); //for Alert
  
    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setOpen(false);
    };
  
    return (
      <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email("Invalid email.").required("Required"),
        password: Yup.string().required("Required"),
      })}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          const [jsonkey, keygenErr] = await getKeyFromPwd(values.password);
          if (keygenErr) alert(keygenErr);
  
          const [response, formErr] = await validateLogin(
            values.email,
            jsonkey.data.key
          );
          if (response) {
            if (response.data.code === 0) {
              // window.sessionStorage.setItem("sid", response.data.data[0].sid);
              window.sessionStorage.setItem("sid",response.data.data[0].sid);
              let sid = window.sessionStorage.getItem("sid");
              const filter = "";
              window.sessionStorage.setItem(
                "vname",
                // response.data.data[0].data.deviceinfo[0].vname //suddenmly doesnt' work
                "aniWEAR"
              );
              setSubmitting(false);
              if (location.state) {  navigate(`${location.state.from.pathname}`,{ replace: true }); }
              else navigate("/", { replace: true });
            } else {
              setErrors({ password: "incorrect email or password", email: true });
            }
          } else console.log("formerr:", formErr);
        }}
      >
        {({
          values,
          errors,
          isSubmitting,
          submitForm,
          setErrors,
          setTouched,
        }) => (
          <div>
            <Container maxWidth="xs">
              <Box maxWidth="xs">
                <img
                  src="https://d17fnq9dkz9hgj.cloudfront.net/uploads/2012/11/126930773-feline-intestinal-lymphoma-symptoms-diagnosis-632x475.jpg"
                  alt="a cat"
                  style={{ width: "100%", objectFit: "cover", marginTop: "10vh" }}
                />
              </Box>
              <Box className={classes.formContainer}>
                <Form style={{ width: "100%" }}>
                  <Box>
                    <Textfield name="email" label="Email"/>
                  </Box>
                  <Box>
                    <Textfield name="password" type="password" label="Password"/>
                  </Box>
                  <Box>
                    <Button
                      m={4}
                      variant="contained"
                      color="primary"
                      type={
                        !errors.email && !errors.password ? "submit" : "button"
                      }
                      disabled={isSubmitting}
                      onClick={submitForm}
                      fullWidth
                    >
                      Login
                    </Button>
                  </Box>
                </Form>
              </Box>
            </Container>
          </div>
        )}
      </Formik>
    );
  }