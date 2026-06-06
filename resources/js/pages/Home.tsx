import { Head, Link, usePage } from '@inertiajs/react';
import WelcomeMessage from '@/components/ui/WelcomeMessage';
import HomeActions from '@/components/ui/HomeActions';

export default function Home() {
    const { auth } = usePage().props;
    const isLoggedIn = auth.user ? true : false;

    console.log(auth);

    return (
        <>
            <Head title="Welcome"></Head>

            <h1 className="text-2xl font-medium text-center mb-5">Laravel Task Tracker</h1>

            <WelcomeMessage isLoggedIn={isLoggedIn}/>
            <HomeActions isLoggedIn={isLoggedIn} />
        </>
    );
}