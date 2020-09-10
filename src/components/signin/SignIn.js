import React, { Component } from 'react';

import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';

import './SignIn.scss';
import { connect } from 'react-redux';
import { signInWithGoogle, signInWithEmail } from '../../redux/user/UserActions';

class SignIn extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { email, password } = this.state;
        const { signInWithEmail } = this.props;
        try {
            signInWithEmail(email, password);
            this.setState({email: '', password: ''});
        } catch (error) {
            console.log(error);
        }
    }

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value});
    }
    render() {
        const { signInWithGoogle } = this.props;
        return(
            <div className='sign-in'>
                <h2 className='title'>I Already Have an Account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit} >
                    <FormInput label='Email' type='email' name='email' value={this.state.email} handleChange={this.handleChange} required />
                    <FormInput label='Password' type='password' name='password' value={this.state.password} handleChange={this.handleChange} required />
                    <div className='buttons'>
                        <CustomButton type='submit'>Sign In</CustomButton>
                        <CustomButton type='button' onClick={signInWithGoogle} isGoogleSignIn>Sign In with Google</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    signInWithGoogle: () => dispatch(signInWithGoogle()),
    signInWithEmail: (email, password) => dispatch(signInWithEmail(email, password))
})

export default connect(null, mapDispatchToProps)(SignIn);