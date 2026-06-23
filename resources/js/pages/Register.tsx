import { Head, Link, usePage } from '@inertiajs/react';
import RegisterForm from '@/components/forms/RegisterForm';

export default function Register() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Login"></Head>
            <RegisterForm />
        </>
    );
}