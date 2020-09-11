import React from 'react'

import './SignIn-SignUp.scss';
import SignIn from '../../signin/SignIn';
import SignUp from '../../sign-up/SignUp';

const SignInSignUp = () => {
    return (
        <div className='sign'>
            <SignIn />
            <SignUp />
        </div>
    )
}

export default SignInSignUp;