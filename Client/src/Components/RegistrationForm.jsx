import React, { useRef, useState } from 'react';
import "./registrationForm.css";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik, useFormikContext } from 'formik';
import * as Yup from "yup"
import { UserRegister } from '../Services/api';

const RegistrationForm = () => {

    const [showPassword, setShowPassword] = useState(false);

    const handleOnsubmit = async (values) => {
        const data = await UserRegister(values)
        if (data.message === "Registered Successfully") {
            toast.success(data.message)
            formik.resetForm();
        } else {
            toast.error(data.message)
        }
    }

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('FirstName is required'),
            email: Yup.string().email().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "email must be a valid email").required('Email is required'),
            password: Yup.string()
                .min(7, 'Password must be at least 7 characters long')
                .max(15, 'Password cannot exceed 15 characters')
                .matches(
                    /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                    'Password must contain at least one capital letter and one special character'
                )
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required'),
        }),

        onSubmit: values => {
            handleOnsubmit(values)
        },
    });

    return (
        <div>
            <section
                className="vh-100 bg-image"
                style={{
                    backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
                }}
            >
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card" style={{ borderRadius: "15px" }}>
                                    <div className="card-body px-5 py-3">
                                        <h2 className="text-uppercase text-center mb-4">Welcome to <span style={{color:"rgba(132, 250, 176)"}}>BugsBytes</span> </h2>
                                        {/* First name */}
                                        <form onSubmit={formik.handleSubmit} >
                                            <div className="form-outline mb-4" >
                                                <input
                                                    type="text" name='firstName'
                                                    className="form-control form-control-lg"
                                                    placeholder="First Name*"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.firstName}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.errors.firstName && formik.touched.firstName ? <div className='text-danger'>{formik.errors.firstName}</div> : null}
                                            </div>
                                            {/* last name */}
                                            <div className="form-outline mb-4" >
                                                <input
                                                    type="text" name='lastName'
                                                    className="form-control form-control-lg"
                                                    placeholder="Last Name"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.lastName}
                                                    onBlur={formik.handleBlur}
                                                />

                                            </div>
                                            {/* email */}
                                            <div className="form-outline mb-4" >
                                                <input
                                                    type="email" name='email'
                                                    className="form-control form-control-lg"
                                                    placeholder="E-mail*"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.email}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.errors.email && formik.touched.email ? <div className='text-danger'>{formik.errors.email}</div> : null}
                                            </div>
                                            {/* password */}
                                            <div className="form-outline mb-4">
                                                <div className="input-group">
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        name="password"
                                                        className="form-control form-control-lg"
                                                        placeholder="Password*"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.password}
                                                        onBlur={formik.handleBlur}
                                                    />

                                                    <span
                                                        type="button"
                                                        className=" password-toggle-btn input-group-text"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword ? <FiEyeOff /> : <FiEye />}
                                                    </span>

                                                </div>
                                                {formik.errors.password && formik.touched.password ? <div className='text-danger'>{formik.errors.password}</div> : null}
                                            </div>
                                            {/* confirmpassword */}
                                            <div className="form-outline mb-4" >
                                                <div className="input-group">
                                                    <input
                                                        type={showPassword ? "text" : "password"} name='confirmPassword'
                                                        className="form-control form-control-lg"
                                                        placeholder="Confirm Password*"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.confirmPassword}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                    <span
                                                        type="button"
                                                        className=" password-toggle-btn input-group-text"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword ? <FiEyeOff /> : <FiEye />}
                                                    </span>
                                                </div>
                                                {formik.errors.confirmPassword && formik.touched.confirmPassword ? <div className='text-danger'>{formik.errors.confirmPassword}</div> : null}

                                            </div>

                                            <div className="d-flex justify-content-center">
                                                <button
                                                    type='submit'
                                                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                                                >
                                                    Register
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RegistrationForm;
