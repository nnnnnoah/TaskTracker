import { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ListCollapse, User } from 'lucide-react';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const { auth } = usePage().props;
    const isLoggedIn = auth.user ? true : false;

    // useForm is Inertia's form helper hook. It returns an object containing the form state and a set of methods for managing it.
    // We destructure the object immediately so we can use the values directly instead of writing form.data, form.setData, etc.
    const {
        post
    } = useForm();

    const logout = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('logout'), {
            preserveScroll: true,
            onSuccess: () => {
                setMenuOpen(false);
            }
        });
    }

    return (
        <header className="border-b bg-neutral-900">
            <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                {/* Left */}
                <div className="flex flex-1 justify-end pr-10">
                    <Link
                        href={route('lists')}
                        className="text-lg font-medium text-neutral-400 hover:text-white"
                    >
                        Lists
                    </Link>
                </div>

                {/* Center Logo */}
                <div className="flex-shrink-0">
                    <Link href={route('home')}>
                        <ListCollapse size={35} className="text-white" />
                    </Link>
                </div>

                {/* Right */}
                <div className="flex flex-1 items-center justify-start pl-10">
                    <Link
                        href={route('tasks')}
                        className="text-lg font-medium text-neutral-400 hover:text-white"
                    >
                        Tasks
                    </Link>
                </div>

                {/* User Menu */}
                <div className="absolute right-6">
                    <div className="relative">

                        {/* NOT logged in: link to login */}
                        {!isLoggedIn ? (
                            <Link
                                href={route('login')}
                                className="rounded-full p-2 hover:bg-neutral-800 inline-flex"
                            >
                                <User className="text-neutral-400" />
                            </Link>
                        ) : (
                            <>
                                <button
                                    onClick={() => setMenuOpen(prev => !prev)}
                                    className="rounded-full p-2 hover:bg-neutral-800"
                                >
                                    <User className="text-neutral-400" />
                                </button>

                                {menuOpen && (
                                    <div className="absolute right-0 mt-3 w-40 border bg-neutral-900">
                                        <button onClick={logout} className="block w-full px-4 py-3 text-left text-sm text-neutral-400 hover:bg-neutral-800">
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </>
                        )}

                    </div>
                </div>
            </div>
        </header>
    );
}