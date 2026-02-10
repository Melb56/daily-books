
"use client"

import React from 'react';

const SignInButton = () => {
    return (
        <div>
            <button onClick={() => login("credentials")}>Se connecter</button>
        </div>
    );
};

export default SignInButton;