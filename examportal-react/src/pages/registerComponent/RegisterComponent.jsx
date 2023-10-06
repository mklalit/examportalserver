import React from 'react';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import authService from '../../service/auth.service';

const RegisterComponent = () => {

    const navigate = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState();

    const schema = Yup.object().shape({
        username: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required(),
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        phone: Yup.string().required(),
        profile: Yup.string().required()
    });

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        mode: 'all',
        resolver: yupResolver(schema)
    });

    const handleValidSubmit = async (data) => {
        setIsSubmitted(true)
        try {
            const result = await authService.register(data);
            if (result.data) {
                navigate('/');
            }
        } catch (error) {
            toast.error(error.data.message);
        }
        setIsSubmitted(false)
    }

    return (
        <div className="row">
            <div className="col-6 offset-3">
                <form onSubmit={handleSubmit(handleValidSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="inputUserName" className="form-label">Username</label>
                        <input type="name" className="form-control" id="inputUserName" {...register('username')} />
                        <div className="form-text text-danger">
                            {errors.username && <p>{errors.username.message}</p>}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="inputPassword" className="form-label">Password</label>
                        <input type="password" className="form-control" id="inputPassword" {...register('password')} />
                        <div className="form-text text-danger">
                            {errors.password && <p>{errors.password.message}</p>}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputEmail" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="inputEmail" {...register('email')} />
                        <div className="form-text text-danger">
                            {errors.email && <p>{errors.email.message}</p>}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputFirstName" className="form-label">First name</label>
                        <input type="name" className="form-control" id="inputFirstName" {...register('firstName')} />
                        <div className="form-text text-danger">
                            {errors.firstName && <p>{errors.firstName.message}</p>}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputLastName" className="form-label">Last name</label>
                        <input type="name" className="form-control" id="inputLastName" {...register('lastName')} />
                        <div className="form-text text-danger">
                            {errors.lastName && <p>{errors.lastName.message}</p>}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPhone" className="form-label">Phone</label>
                        <input type='number' className="form-control" id="inputPhone" {...register('phone')} />
                        <div className="form-text text-danger">
                            {errors.phone && <p>{errors.phone.message}</p>}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputProfile" className="form-label">Profile</label>
                        <input type="text" className="form-control" id="inputProfile" {...register('profile')} />
                        <div className="form-text text-danger">
                            {errors.profile && <p>{errors.profile.message}</p>}
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={isSubmitted || !isDirty || !isValid}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterComponent