import { Head, Link, usePage } from '@inertiajs/react';
import LoginForm from '@/components/forms/LoginForm';

export default function Register() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Register"></Head>

            <h1 className="text-2xl font-medium text-center mb-5">Register Your Account</h1>
            <p className="text-center mb-10">Please provide the details that will be used to log into your account.</p>

            <LoginForm />
        </>
    );
}