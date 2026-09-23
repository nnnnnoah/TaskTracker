import { Head, usePage } from '@inertiajs/react';
import WelcomeMessage from '@/components/ui/WelcomeMessage';
import HomeActions from '@/components/ui/HomeActions';

export default function Welcome() {
    const { auth } = usePage().props;
    const isLoggedIn = !!auth.user;
    const userName = auth.user?.name; // Get the user's name if logged in

    return (
        <>
            <Head title="Welcome" />

            {isLoggedIn ? (
                    <WelcomeMessage isLoggedIn={isLoggedIn} userName={userName} />
            ) : (
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

                        <WelcomeMessage isLoggedIn={isLoggedIn} userName={userName} />
                        <HomeActions isLoggedIn={isLoggedIn} />
                    </div>
                </div>
            )}
        </>
    );
}