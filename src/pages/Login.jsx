import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import image from "../assets/result.svg";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Formik, Form } from "formik";
import { object, string } from "yup";
import useAuthCall from "../hooks/useAuthCall";
import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";

const Login = () => {
  const { login } = useAuthCall();
  const { loading, error } = useSelector((state) => state.auth);

  //? harici validasyon şeması
  const loginSchema = object({
    email: string()
      .email("Lütfen geçerli bir email giriniz")
      .required("Bu alan zorunludur"),
    password: string()
      .required("Bu alan zorunludur")
      // .min(8, "En az 8 karakter girilmelidir")
      // .max(16, "En fazla 16 karakter girilmelidir")
      // .matches(/\d+/, "En az bir rakam içermelidir.")
      // .matches(/[a-z]/, "En az bir küçük harf içermelidir.")
      // .matches(/[A-Z]/, "En az bir büyük harf içermelidir.")
      // .matches(/[!,?{}><%&$#£+-.]+/, "En az bir özel karakter içermelidir."),
  });

  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12} mb={3}>
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
            mb={4}
            color="secondary.light"
          >
            Giriş
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Giriş yapılamadı. Lütfen bilgilerinizi kontrol ediniz.
            </Alert>
          )}

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values, action) => {
              login(values);
              action.resetForm();
              action.setSubmitting(false);
            }}
          >
            {({ handleChange, handleBlur, values, touched, errors }) => (
              <Form>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    label="Email"
                    name="email"
                    id="email"
                    type="email"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    label="Şifre"
                    name="password"
                    id="password"
                    type="password"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  <Button 
                    variant="contained" 
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/register">Hesabınız yok mu? Kayıt olun</Link>
          </Box>
        </Grid>

        <Grid item xs={10} sm={7} md={6}>
          <Container>
            <img src={image} alt="login" style={{ maxWidth: "100%" }} />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;