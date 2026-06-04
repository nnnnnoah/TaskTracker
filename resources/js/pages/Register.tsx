import { Head, Link, usePage } from '@inertiajs/react';

export default function Home() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Login"></Head>

            {auth.user ? (
                <>
                    Redirect to homepage
                </>
            ) : (
                <>
                    Show the register form
                </>
            )}
        </>
    );
}