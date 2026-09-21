import { Link } from '@inertiajs/react';

type HomeActionsProps = {
    isLoggedIn: boolean,
};

export default function HomeActions({ isLoggedIn }: HomeActionsProps) {
    return (
        <>
            <div className="text-center">
                {isLoggedIn ? (
                    <>
                        <Link href="/lists">Lists</Link>
                        <Link href="/tasks">Tasks</Link>
                    </>
                ) : (
                    <div className="w-full flex justify-center gap-4">
                        <Link href={route('login')}>
                            <button className="px-4 py-2 w-2xs bg-blue-500 hover:bg-blue-600 text-white">
                                Login
                            </button>
                        </Link>

                        <Link href={route('register')}>
                            <button className="px-4 py-2 w-2xs bg-purple-500 hover:bg-purple-600 text-white">
                                Register
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}