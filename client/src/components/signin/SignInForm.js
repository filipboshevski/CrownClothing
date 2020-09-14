import React from 'react';
import './SignIn.scss';

import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';

const SignInForm = ({properties: {handleSubmit, handleChange, email, password, onClickGoogle}}) => {
    return (
        <div className='sign-in'>
            <h2 className='title'>I Already Have an Account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit} >
                <FormInput label='Email' type='email' name='email' value={email} handleChange={handleChange} required />
                <FormInput label='Password' type='password' name='password' value={password} handleChange={handleChange} required />
                <div className='buttons'>
                    <CustomButton type='submit'>Sign In</CustomButton>
                    <CustomButton type='button' onClick={onClickGoogle} isGoogleSignIn>Sign In with Google</CustomButton>
                </div>
            </form>
        </div>
    )
};

export default SignInForm;