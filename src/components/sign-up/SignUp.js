import React, { Component } from 'react';

import './SignUp.scss';
import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';
import { connect } from 'react-redux';
import { signUpUser } from '../../redux/user/UserActions';

class SignUp extends Component {
    constructor() {
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {displayName, email, password, confirmPassword} = this.state;
        const { signUpUser } = this.props;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            signUpUser(email, password, displayName);

            this.setState ({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch (error) {
            console.error(error);
        };
    };

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        const {displayName, email, password, confirmPassword} = this.state;
        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput type='text' name='displayName' label='Display Name' value={displayName} onChange={this.handleChange} required/>
                    <FormInput type='email' name='email' label='Email' value={email} onChange={this.handleChange} required/>
                    <FormInput type='password' name='password' label='Password' value={password} onChange={this.handleChange} required/>
                    <FormInput type='password' name='confirmPassword' label='Confirm Password' value={confirmPassword} onChange={this.handleChange} />
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    signUpUser: (email, password, displayName) => dispatch(signUpUser(email, password, displayName))
})

export default connect(null, mapDispatchToProps)(SignUp);