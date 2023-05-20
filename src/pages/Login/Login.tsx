import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../../styles/main.scss';
import { useLogin } from './hooks';
import useRegister from './hooks/useRegister';

const validationSchemaLogin = Yup.object().shape({
  correo: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const validationSchemaRegister = Yup.object().shape({
  nombre: Yup.string().required('Required'),
  apellido_p: Yup.string().required('Required'),
  apellido_m: Yup.string().required('Required'),
  numero_control: Yup.number().required('Required'),
  telefono: Yup.number().required('Required'),
  correo: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const LoginForm = () => {
  const { onSubmit: onSubmitHook } = useLogin({});

  const formik = useFormik({
    initialValues: {
      correo: '',
      password: '',
    },
    validateOnChange: false,
    validationSchema: validationSchemaLogin,
    onSubmit: (values) => {
      console.log(values);
      onSubmitHook(values);
    },
  });

  return (
    <div className="login" style={formik.touched.correo && formik.errors.correo && formik.touched.password && formik.errors.password ? { marginBottom: '-40px'} : formik.touched.correo && formik.errors.correo ? {marginBottom: '-30px'} : formik.touched.password && formik.errors.password ? {marginBottom: '-30px'} : {}}>
      <label htmlFor="chk" aria-hidden="true">Log in</label>
      <form className="form" onSubmit={formik.handleSubmit}>
        <input
          className="input"
          type="email"
          name="correo"
          placeholder="Email"
          required
          value={formik.values.correo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.correo && formik.errors.correo && (
          <div style={{ color: 'red' }}>{formik.errors.correo}</div>
        )}
        <input
          className="input"
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <div style={{ color: 'red' }}>{formik.errors.password}</div>
        )}
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

const RegisterForm = () => {

  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido_p: '',
      apellido_m: '',
      numero_control: '',
      telefono: '',
      correo: '',
      password: '',
    },
    validateOnChange: false,
    validationSchema: validationSchemaRegister,
    onSubmit: (values) => {
      console.log(values);
      onSubmit(values, formik)
    },
  });
  const { onSubmit } = useRegister({formik})


  return (
    <div className="register" style={{ overflow: 'auto' }}>
      <form className="form" onSubmit={formik.handleSubmit}>
        <label htmlFor="chk" aria-hidden="true">Register</label>
        <input
          className="input"
          type="text"
          name="nombre"
          placeholder="Nombre"
          required
          value={formik.values.nombre}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.nombre && formik.errors.nombre && (
          <div style={{ color: 'red' }}>{formik.errors.nombre}</div>
        )}
        <input
          className="input"
          type="text"
          name="apellido_p"
          placeholder="Apellido paterno"
          required
          value={formik.values.apellido_p}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.apellido_p && formik.errors.apellido_p && (
          <div style={{ color: 'red' }}>{formik.errors.apellido_p}</div>
        )}
        <input
          className="input"
          type="text"
          name="apellido_m"
          placeholder="Apellido materno"
          required
          value={formik.values.apellido_m}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} />
        {formik.touched.apellido_m && formik.errors.apellido_m && (
          <div style={{ color: 'red' }}>{formik.errors.apellido_m}</div>
        )}
        <input
          className="input"
          type="number"
          name="numero_control"
          placeholder="No. de control"
          required
          value={formik.values.numero_control}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.numero_control && formik.errors.numero_control && (
          <div style={{ color: 'red' }}>{formik.errors.numero_control}</div>
        )}
        <input
          className="input"
          type="number"
          name="telefono"
          placeholder="Telefono"
          required
          value={formik.values.telefono}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.telefono && formik.errors.telefono && (
          <div style={{ color: 'red' }}>{formik.errors.telefono}</div>
        )}
        <input
          className="input"
          type="email"
          name="correo"
          placeholder="Correo"
          required
          value={formik.values.correo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.correo && formik.errors.correo && (
          <div style={{ color: 'red' }}>{formik.errors.correo}</div>
        )}
        <input
          className="input"
          type="password"
          name="password"
          placeholder="Contraseña"
          required
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <div style={{ color: 'red' }}>{formik.errors.password}</div>
        )}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

const Login = () => {
  return (
    <div className="containerLogin">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <LoginForm />
        <RegisterForm />
      </div>
    </div>
  );
};

Login.auth = false;

export default Login;
