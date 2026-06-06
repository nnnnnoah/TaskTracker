import { Link } from '@inertiajs/react';

type HomeActionsProps = {
    isLoggedIn: boolean,
};

export default function HomeActions({isLoggedIn}: HomeActionsProps) {
    return (
        <>
            <div className="text-center">
                {isLoggedIn ? (
                    <>
                        <Link href="/lists">Lists</Link>
                        <Link href="/tasks">Tasks</Link>
                    </>
                ) : (
                    <>
                        <Link href="/login">Login</Link>
                        <Link href="/register">Register</Link>
                    </>
                )}
            </div>
        </>
    );
}