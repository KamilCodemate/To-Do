import React from 'react';
import FormHeader from '../components/Forms/FormHeader';
import FormContainer from '../components/Forms/FormContainer';
import FormContent from '../components/Forms/FormContent';
import FormSidebar from '../components/Forms/FormSidebar';
import signupimage from '../assets/img/signupimage.jpg';
import '../assets/styles/SignUpForm.scss';

const SignUpForm: React.FC<{}> = (): React.ReactElement => {
  return (
    <div className="SignUpForm">
      <FormContainer>
      <>
        <FormHeader title="Sign Up" />
        <div className="form-main">
          <FormContent>
            <form method="post">
              <div className="form-main-title">
                <h2>Hello!</h2>
                <p>Please sign up to continue</p>
              </div>
              <label>Full Name</label>
              <input type="text" />
              <label>Email Address</label>
              <input type="email" />
              <label>Password</label>
              <input type="password" />
              <label>Confirm Password</label>
              <input type="password" />
              <input type="submit" value="Sign Up" />
            </form>
          </FormContent>
          <FormSidebar img={signupimage}>
            <p>I'm already a <span>member</span>!</p>
            <button>Sign In</button>
          </FormSidebar>
        </div>
      </>
      </FormContainer>
    </div>
  );
};

export default SignUpForm;
