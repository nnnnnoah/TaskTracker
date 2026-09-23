import { Head, usePage } from '@inertiajs/react';
import HomeActions from '@/components/ui/HomeActions';
import Welcome from '@/pages/Welcome';

export default function Home() {
    // Access the auth property from the Inertia page props. This value is used to dynamically render homepage actions.
    const { auth } = usePage().props;
    const isLoggedIn = !!auth.user;

    return (
        <>
            <Head title="Home" />

            <div className="py-10 px-5">
                <Welcome />

                <HomeActions
                    isLoggedIn={isLoggedIn}
                />
            </div>
        </>
    );
}