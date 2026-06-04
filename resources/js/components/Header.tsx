import { useState } from 'react';
import { ListCollapse, User } from 'lucide-react';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="border-b bg-neutral-900">
            <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                {/* Left */}
                <div className="flex flex-1 justify-end pr-10">
                    <a
                        href="#"
                        className="text-lg font-medium text-neutral-400 hover:text-white"
                    >
                        Lists
                    </a>
                </div>

                {/* Center Logo */}
                <div className="flex-shrink-0">
                    <ListCollapse size={35} className = "text-white"/>
                </div>

                {/* Right */}
                <div className="flex flex-1 items-center justify-start pl-10">
                    <a
                        href="#"
                        className="text-lg font-medium text-neutral-400 hover:text-white"
                    >
                        Tasks
                    </a>
                </div>

                {/* User Menu */}
                <div className="absolute right-6">
                    <div className="relative">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="rounded-full p-2 hover:bg-neutral-100"
                        >
                            <User className="text-neutral-400"/>
                        </button>

                        {menuOpen && (
                            <div className="absolute right-0 mt-3 w-40 border bg-neutral-900">
                                <button
                                    className="block w-full px-4 py-3 text-neutral-400 font-medium text-left text-sm hover:bg-neutral-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}