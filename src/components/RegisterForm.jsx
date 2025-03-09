import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Form } from "formik";
import { object, string } from "yup";

export const registerSchema = object({
  email: string()
    .email("Geçerli bir email adresi giriniz")
    .required("Email zorunludur"),
  first_name: string().max(50, "İsim 50 karakterden az olmalıdır."),
  last_name: string().max(50, "Soyisim 50 karakterden az olmalıdır."),
  password: string().required("Şifre zorunludur"),
  // .min(8, "Şifre en az 8 karakter olmalıdır")
  // .max(20, "Şifre en fazla 20 karakter olmalıdır")
  // .matches(/\d+/, "Şifre bir sayı içermelidir")
  // .matches(/[a-z]/, "Şifre bir küçük harf içermelidir")
  // .matches(/[A-Z]/, "Şifre bir büyük harf içermelidir")
  // .matches(/[!,?{}><%&$#£+-.]+/, "Şifre bir özel karakter içermelidir"),
  password2: string()
    .required("Şifre tekrarı zorunludur")
    .oneOf([object.ref("password")], "Şifreler eşleşmelidir"),
});

const RegisterForm = ({
  values,
  handleChange,
  errors,
  touched,
  handleBlur,
}) => {
  return (
    <div>
      <Form>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Email"
            name="email"
            id="email"
            type="email"
            variant="outlined"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            label="İsim"
            name="first_name"
            id="firstName"
            type="text"
            variant="outlined"
            value={values.first_name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.first_name && Boolean(errors.first_name)}
            helperText={touched.first_name && errors.first_name}
          />
          <TextField
            label="Soyisim"
            name="last_name"
            id="last_name"
            type="text"
            variant="outlined"
            value={values.last_name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.last_name && Boolean(errors.last_name)}
            helperText={touched.last_name && errors.last_name}
          />
          <TextField
            label="Şifre"
            name="password"
            id="password"
            type="password"
            variant="outlined"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            label="Şifre Tekrarı"
            name="password2"
            id="password2"
            type="password"
            variant="outlined"
            value={values.password2}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password2 && Boolean(errors.password2)}
            helperText={touched.password2 && errors.password2}
          />
          <Button type="submit" variant="contained" size="large">
            Kayıt Ol
          </Button>
        </Box>
      </Form>
    </div>
  );
};

export default RegisterForm;
