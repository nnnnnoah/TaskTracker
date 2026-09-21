import type { ReactNode } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Header from '@/components/Header';

// Define the props type for the AppLayout component
type Props = {
    children: ReactNode;
};

export default function AppLayout({ children }: Props) {
    // Access the auth and component properties from the Inertia page props
    const { auth, component } = usePage().props as any;

    // Determine if the user is logged in and if the current page is the home page
    const isLoggedIn = !!auth?.user;
    const isHome = component === 'Home';

    // Dynamically determine if the content should be centered based on the current page and login status
    const shouldBeCentered = isHome && !isLoggedIn;

    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Manrope:wght@300..800&display=swap"
                    rel="stylesheet"
                />
            </Head>

            {/* Render the Header component only if the user is logged in */}
            {isLoggedIn && <Header />}

            <main
                className={
                    shouldBeCentered
                        ? "min-h-screen flex items-center justify-center"
                        : "py-10 px-5"
                }
            >
                {children}
            </main>
        </>
    );
}