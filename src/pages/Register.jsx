import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import image from "../assets/result.svg";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import RegisterForm, { registerSchema } from "../components/RegisterForm";
import { Formik } from "formik";
import useAuthCall from "../hooks/useAuthCall";

const Register = () => {
  const { register } = useAuthCall();
  const { loading, error } = useSelector((state) => state.auth);

  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        rowSpacing={{ sm: 3 }}
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h3" color="primary" align="center">
            STOCK APP
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={2}
            color="secondary.light"
          >
            Kayıt Ol
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Kayıt işlemi başarısız oldu. Lütfen bilgilerinizi kontrol ediniz.
            </Alert>
          )}

          <Formik
            initialValues={{
              email: "",
              first_name: "",
              last_name: "",
              password: "",
              password2: "",
            }}
            validationSchema={registerSchema}
            onSubmit={(values, actions) => {
              register(values);
              actions.resetForm();
              actions.setSubmitting(false);
            }}
          >
            {(formikProps) => <RegisterForm {...formikProps} />}
          </Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/login">Zaten bir hesabınız var mı? Giriş yapın</Link>
          </Box>
        </Grid>

        <Grid item xs={0} sm={7} md={6}>
          <Container>
            <img src={image} alt="register" style={{ maxWidth: "100%" }} />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
