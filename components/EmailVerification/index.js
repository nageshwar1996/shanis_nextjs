import React from "react";
import './style.scss'

const EmailVerification = (user) => {
  
  return (
    <div className="verification-container">
      <div className="verification-content">
        <h1>Verify Your Email</h1>
        <p>
          Thank you for creating an account. We've sent you an email with a
          verification link. Please check your email and click the link to
          verify your account.
        </p>
        <p>
          If you haven't received the email, please check your spam folder or
          request a new verification email.
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;
