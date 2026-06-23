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
                        <Link href="/login"><button>Login</button></Link>
                        <Link href="/register"><button>Register</button></Link>
                    </>
                )}
            </div>
        </>
    );
}