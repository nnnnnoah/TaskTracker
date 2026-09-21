import type { ReactNode } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Header from '@/components/Header';

// Define the props type for the AppLayout component.
type Props = {
    children: ReactNode;
};

export default function AppLayout({ children }: Props) {
    // Access the Inertia page object to get the current page's component and props.
    const page = usePage();

    // Determine if the user is logged in and if the current page is the home page.
    const { auth } = page.props as any;

    // Check if the user is logged in by verifying if the auth object has a user property.
    const isLoggedIn = !!auth?.user;

    // Check if the current page's component is 'Welcome'.
    const isHome = page.component === 'Welcome';

    // Determine if the main content should be centered based on whether the user is on the home page and not logged in.
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