import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from '../../context/AuthProvider';

const SignUp = () => {
    const { authUser, setAuthUser } = useAuth();
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [isSignUp, setIsSignUp] = useState(true);

    const onSubmit = async (data) => {
        const endpoint = isSignUp ? "/user/signup" : "/user/login"; // Dynamically use the endpoint
        const userInfo = isSignUp
            ? { fullname: data.fullname, email: data.email, password: data.password, confirmPassword: data.confirmPassword }
            : { email: data.email, password: data.password };

        try {
            const response = await axios.post(`http://localhost:3000${endpoint}`, userInfo, { withCredentials: true });
            if (response.data) {
                alert(`${isSignUp ? "Signup" : "Login"} successful`);
                localStorage.setItem("ChatApp", JSON.stringify(response.data));
                setAuthUser(response.data);
            }
        } catch (error) {
            const errorMessage = error.response ? error.response.data.error : "Unable to connect to the server";
            alert("Error: " + errorMessage);
        }
    };

    return (
        <div className='bg-indigo-500 h-screen flex justify-center items-center'>
            <form
                className='bg-white w-full max-w-md rounded-2xl p-8 flex flex-col items-center'
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className='font-bold text-3xl mb-4 text-center'>
                    Convo<span className='text-green-500'>Flow</span>
                </h1>

                <h2 className='font-bold text-2xl mb-6 text-center'>
                    {isSignUp ? 'Sign Up' : 'Login'}
                </h2>

                {/* Full Name Field (only for Sign Up) */}
                {isSignUp && (
                    <div className='w-full mb-4'>
                        <input
                            {...register('fullname', { required: 'Full name is required' })}
                            className='border-2 p-2 rounded-lg w-full'
                            type='text'
                            placeholder='Full Name'
                        />
                        {errors.fullname && <span className="text-red-500">{errors.fullname.message}</span>}
                    </div>
                )}

                {/* Email Field */}
                <div className='w-full mb-4'>
                    <input
                        {...register('email', { required: 'Email is required' })}
                        className='border-2 p-2 rounded-lg w-full'
                        type='email'
                        placeholder='Email'
                    />
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                </div>

                {/* Password Field */}
                <div className='w-full mb-4'>
                    <input
                        {...register('password', { required: 'Password is required' })}
                        className='border-2 p-2 rounded-lg w-full'
                        type='password'
                        placeholder='Password'
                    />
                    {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                </div>

                {/* Confirm Password Field (only for Sign Up) */}
                {isSignUp && (
                    <div className='w-full mb-4'>
                        <input
                            {...register('confirmPassword', {
                                required: 'Please confirm your password',
                                validate: value => value === watch('password') || 'Passwords do not match',
                            })}
                            className='border-2 p-2 rounded-lg w-full'
                            type='password'
                            placeholder='Confirm Password'
                        />
                        {errors.confirmPassword && (
                            <span className="text-red-500">{errors.confirmPassword.message}</span>
                        )}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type='submit'
                    className='bg-green-500 text-white font-bold p-2 rounded-lg w-full mb-4'
                >
                    {isSignUp ? 'Sign Up' : 'Login'}
                </button>

                {/* Switch between Sign Up and Login */}
                <p>
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}{' '}
                    <button
                        type='button'
                        className='text-green-500 underline'
                        onClick={() => setIsSignUp(!isSignUp)}
                    >
                        {isSignUp ? 'Login' : 'Sign Up'}
                    </button>
                </p>
            </form>
        </div>
    );
};

export default SignUp;
