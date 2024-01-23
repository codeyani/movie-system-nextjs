"use client";

import RegisterForm from '@components/form/RegisterForm';

const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="auth-forms">
        <RegisterForm />
      </div>
    </div>
  )
}

export default Register;