import React, { useState } from 'react';

import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';

import './SignIn.scss';
import { connect } from 'react-redux';
import { signInWithGoogle, signInWithEmail } from '../../redux/user/UserActions';

const SignIn = ({signInWithEmail, signInWithGoogle}) => {

    const [userCredentials, setCredentials] = useState({email: '', password: ''});
    const { email, password } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            signInWithEmail(email, password);
            setCredentials({email: '', password: ''});
        } catch (error) {
            console.log(error);
        };
    };

    const handleChange = event => {
        const {value, name} = event.target;
        setCredentials({...userCredentials ,[name]: value});
    };

    return (
        <div className='sign-in'>
            <h2 className='title'>I Already Have an Account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit} >
                <FormInput label='Email' type='email' name='email' value={email} handleChange={handleChange} required />
                <FormInput label='Password' type='password' name='password' value={password} handleChange={handleChange} required />
                <div className='buttons'>
                    <CustomButton type='submit'>Sign In</CustomButton>
                    <CustomButton type='button' onClick={signInWithGoogle} isGoogleSignIn>Sign In with Google</CustomButton>
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    signInWithGoogle: () => dispatch(signInWithGoogle()),
    signInWithEmail: (email, password) => dispatch(signInWithEmail(email, password))
})

export default connect(null, mapDispatchToProps)(SignIn);