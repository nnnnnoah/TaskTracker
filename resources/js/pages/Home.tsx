import { Head, usePage } from '@inertiajs/react';
import WelcomeMessage from '@/components/ui/WelcomeMessage';
import HomeActions from '@/components/ui/HomeActions';

export default function Home() {
    // Access the auth property from the Inertia page props. This value is used to dynamically render homepage actions.
    const { auth } = usePage().props;
    const isLoggedIn = !!auth.user;

    return (
        <>
            <Head title="Home" />

            <div className="py-10 px-5">
                <h1 className="text-3xl font-bold mb-6">
                    Welcome back!
                </h1>

                <HomeActions isLoggedIn={isLoggedIn} />
            </div>
        </>
    );
}