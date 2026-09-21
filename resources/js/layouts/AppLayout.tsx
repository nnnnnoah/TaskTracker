import type { ReactNode } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Header from '@/components/Header';

type Props = {
    children: ReactNode;
};

export default function AppLayout({ children }: Props) {
    const { auth, component } = usePage().props as any;

    const isLoggedIn = !!auth?.user;
    const isHome = component === 'Home';

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