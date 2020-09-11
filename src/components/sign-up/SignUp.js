import React, { useEffect, useState } from 'react';

import './SignUp.scss';
import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';
import { connect } from 'react-redux';
import { signUpUser } from '../../redux/user/UserActions';

const SignUp = ({signUpUser}) => {
    const [userCredentials, setCredentials] = useState({displayName: '', email: '', password:'', confirmPassword: ''});
    const { displayName, email, password, confirmPassword } = userCredentials;

    useEffect(() => console.log(userCredentials), [userCredentials]);

    const handleSubmit = async event => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            signUpUser(email, password, displayName);

            setCredentials({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch (error) {
            console.error(error);
        };
    };

    const handleChange = event => {
        const {name, value} = event.target;
        setCredentials({...userCredentials, [name]: value});
    };

    return (
        <div className='sign-up'>
            <h2 className='title'>I do not have an account</h2>
            <span>Sign up with your email and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput type='text' name='displayName' label='Display Name' value={displayName} onChange={handleChange} required/>
                <FormInput type='email' name='email' label='Email' value={email} onChange={handleChange} required/>
                <FormInput type='password' name='password' label='Password' value={password} onChange={handleChange} required/>
                <FormInput type='password' name='confirmPassword' label='Confirm Password' value={confirmPassword} onChange={handleChange} />
                <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    signUpUser: (email, password, displayName) => dispatch(signUpUser(email, password, displayName))
})

export default connect(null, mapDispatchToProps)(SignUp);