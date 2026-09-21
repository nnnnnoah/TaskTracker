import { Head, usePage } from '@inertiajs/react';
import WelcomeMessage from '@/components/ui/WelcomeMessage';
import HomeActions from '@/components/ui/HomeActions';

export default function Home() {
    const { auth } = usePage().props;
    const isLoggedIn = !!auth.user;

    return (
        <>
            <Head title="Welcome" />

            <div className="min-h-screen flex items-center justify-center px-6">
                <div className="max-w-2xl text-center space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-5xl font-bold text-white">
                            Laravel Task Tracker
                        </h1>

                        <p className="text-lg text-neutral-400 mb-0">
                            A task management application built with Laravel,
                            React, and Inertia.
                        </p>

                        <p className="text-lg text-neutral-400 font-bold">
                            Author: Noah Miller
                        </p>
                    </div>

                    <WelcomeMessage isLoggedIn={isLoggedIn} />
                    <HomeActions isLoggedIn={isLoggedIn} />
                </div>
            </div>
        </>
    );
}