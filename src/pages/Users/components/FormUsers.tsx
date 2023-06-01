import { useFormik } from "formik";
import useRegister from "../../Login/hooks/useRegister";
import * as Yup from "yup";

const validationSchemaRegister = Yup.object().shape({
  nombre: Yup.string().required("Required"),
  apellido_p: Yup.string().required("Required"),
  apellido_m: Yup.string().required("Required"),
  numero_control: Yup.number().required("Required"),
  telefono: Yup.number().required("Required"),
  correo: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  tipoId: Yup.string().required("Required"),
});

const FormUsers = () => {
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido_p: "",
      apellido_m: "",
      numero_control: "",
      telefono: "",
      correo: "",
      password: "",
      tipoId: "3",
    },
    validateOnChange: false,
    validationSchema: validationSchemaRegister,
    onSubmit: (values) => {
      //console.log(values);
      onSubmit(values, formik);
    },
  });
  const { onSubmit } = useRegister({ formik });

  return (
    <div style={{ overflow: "auto" }}>
      <form className="form" onSubmit={formik.handleSubmit}>
        <label htmlFor="chk" aria-hidden="true" style={{ color: "black" }}>
          Nuevo usuario
        </label>

        <label style={{ color: "black", fontSize: '16px', marginTop: '20px' }}>
          Tipo de usuario:
        </label>
        <div>
        <label style={ formik.values.tipoId == '3'  ? {color: '#302B78', fontSize: '24px'} : {color: 'lightgray', fontSize: '24px'} }>
          <input
            type="radio"
            name="tipoId"
            value="3"
            checked={formik.values.tipoId === '3'}
            onChange={formik.handleChange}
          />
          Alumno
        </label>
      </div>
      <div>
        <label style={ formik.values.tipoId == '2'  ? {color: '#302B78', fontSize: '24px'} : {color: 'lightgray', fontSize: '24px'}  } >
          <input
            type="radio"
            name="tipoId"
            value="2"
            checked={formik.values.tipoId === '2'}
            onChange={formik.handleChange}
          />
          Maestro
        </label>
      </div>
        <input
          className="input"
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formik.values.nombre}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.nombre && formik.errors.nombre && (
          <div style={{ color: "red" }}>{formik.errors.nombre}</div>
        )}
        <input
          className="input"
          type="text"
          name="apellido_p"
          placeholder="Apellido paterno"
          value={formik.values.apellido_p}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.apellido_p && formik.errors.apellido_p && (
          <div style={{ color: "red" }}>{formik.errors.apellido_p}</div>
        )}
        <input
          className="input"
          type="text"
          name="apellido_m"
          placeholder="Apellido materno"
          value={formik.values.apellido_m}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.apellido_m && formik.errors.apellido_m && (
          <div style={{ color: "red" }}>{formik.errors.apellido_m}</div>
        )}
        <input
          className="input"
          type="number"
          name="numero_control"
          placeholder="No. de control"
          value={formik.values.numero_control}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.numero_control && formik.errors.numero_control && (
          <div style={{ color: "red" }}>{formik.errors.numero_control}</div>
        )}
        <input
          className="input"
          type="number"
          name="telefono"
          placeholder="Telefono"
          value={formik.values.telefono}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.telefono && formik.errors.telefono && (
          <div style={{ color: "red" }}>{formik.errors.telefono}</div>
        )}
        <input
          className="input"
          type="email"
          name="correo"
          placeholder="Correo"
          value={formik.values.correo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.correo && formik.errors.correo && (
          <div style={{ color: "red" }}>{formik.errors.correo}</div>
        )}
        <input
          className="input"
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        )}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default FormUsers;
