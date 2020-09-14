import React, { useState } from 'react';

import {toggleIsLoading} from '../../redux/save/SaveAction';

import './SignIn.scss';
import { connect } from 'react-redux';
import { signInWithGoogle, signInWithEmail } from '../../redux/user/UserActions';
import SignInForm from './SignInForm';
import withSpinner from '../spinner/WithSpinner';
import { createStructuredSelector } from 'reselect';
import {selectIsLoading} from '../../redux/save/SaveSelector';


const SignInFormWithSpinner = withSpinner(SignInForm);

const SignIn = ({signInWithEmail, signInWithGoogle, toggleIsLoading, isLoading}) => {

    const [userCredentials, setCredentials] = useState({email: '', password: ''});
    const { email, password } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            toggleIsLoading();
            signInWithEmail(email, password);
            setTimeout(toggleIsLoading, 1000);
            setCredentials({email: '', password: ''});
        } catch (error) {
            console.log(error);
        };
    };

    const onClickGoogle = () => {
        toggleIsLoading();
        signInWithGoogle();
        setTimeout(toggleIsLoading, 1000);
    };

    const handleChange = event => {
        const {value, name} = event.target;
        setCredentials({...userCredentials ,[name]: value});
    };

    return (
        <SignInFormWithSpinner isLoading={isLoading} properties={{handleChange, handleSubmit, email, password, onClickGoogle}} />
    )
}

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsLoading
})

const mapDispatchToProps = dispatch => ({
    signInWithGoogle: () => dispatch(signInWithGoogle()),
    signInWithEmail: (email, password) => dispatch(signInWithEmail(email, password)),
    toggleIsLoading: () => dispatch(toggleIsLoading())
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);