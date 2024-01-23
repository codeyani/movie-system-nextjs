"use client";

import LoginForm from '@components/form/LoginForm';
import { useSession } from "next-auth/react";
import Dashboard from './pages/dashboard/page';

const Home = () => {
  const { data: session } = useSession();
  return (
    <div className="flex items-center justify-center min-h-screen">
      {session?.user ? (
        <>
          <Dashboard />
        </>
      ) : (
        <div className="auth-forms">
          <LoginForm />
        </div>
      )}
    </div>
  )
}

export default Home;