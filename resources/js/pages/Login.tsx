import { Head, Link, usePage } from '@inertiajs/react';
import LoginForm from '@/components/forms/LoginForm';

export default function Login() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Login"></Head>

            <h1 className="text-2xl font-medium text-center mb-5">Login to Your Account</h1>
            <p className="text-center mb-10">Please enter the login credentials associated with your account.</p>

            <LoginForm />
        </>
    );
}