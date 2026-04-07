import { Head, Link, usePage } from '@inertiajs/react';

export default function Home() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome"></Head>

            {auth.user ? (
                <>
                    Logged in dashboard here
                </>
            ) : (
                <>
                    Lorem ipsum about the app here

                    <Link
                        href="/login"
                        className=""
                    >
                        Log in
                    </Link>
                    <Link
                        href="/register"
                        className=""
                    >
                        Register
                    </Link>
                </>
            )}
        </>
    );
}