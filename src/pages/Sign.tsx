import React, { useState } from 'react';
import { SignInForm } from '../components/Sign/SignInForm';
import { SignUpForm } from '../components/Sign/SignUpForm';

export default function Sign(): React.ReactElement {
  const [isSignUp, setIsSignUp] = useState(false);
  function toggleForm() {
    setIsSignUp(!isSignUp);
  }
  return (
    <>
      <header className="header-sign">
        <button className="header__brand">
          <h3 className="heade__brand-secondary">leverX</h3>
          <h2 className="header__brand-main">employee services</h2>
        </button>
        {!isSignUp && (
          <button className="header__btn-signup">
            <p className="sign--up" onClick={toggleForm}>
              Sign Up
            </p>
          </button>
        )}

        {isSignUp && (
          <button className="header__btn-signin" onClick={toggleForm}>
            <p className="header__btn-text">Sign In</p>
          </button>
        )}
      </header>
      <main className="sign">
        <div className="sign__message">
          <h1 className="sign__welcome">
            <span className="highlight">Welcome</span>
          </h1>
          <p className="sign__paragraph">
            To <span className="highlight">LeverX</span> Employee Services
          </p>
        </div>
        <div className="sign__form-container">
          {isSignUp ? <SignUpForm /> : <SignInForm />}
        </div>
      </main>
    </>
  );
}
