import { Link } from '@inertiajs/react';

// Define the props for the HomeActions component
type HomeActionsProps = {
    isLoggedIn: boolean;

    // Optional props for lists and tasks, which can be arrays of objects
    lists?: Array<object>;
    tasks?: Array<object>;
};

export default function HomeActions({ isLoggedIn, lists, tasks }: HomeActionsProps) {
    return (
        <div className="w-full max-w-5xl mx-auto px-4">
            {isLoggedIn ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Lists */}
                    <div className="relative rounded-lg border border-blue-500/40 bg-neutral-950 overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-blue-500/30 bg-blue-500/10">
                            <h2 className="text-lg font-semibold text-blue-400">
                                Lists
                            </h2>

                            <Link
                                href={route('lists')}
                                className="text-sm text-blue-400 hover:text-blue-300"
                            >
                                View all
                            </Link>
                        </div>
                        
                        {lists?.length === 0 || !lists && (
                            <p className="text-zinc-400 text-sm text-center py-10">
                                No lists found. Click the + button to add a new task.
                            </p>
                        )}

                        <div className="h-80 overflow-y-auto p-4 space-y-2">
                            {lists?.map((list, index) => (
                                // How should these routes be genereated? http? inline href?
                                <Link
                                    href="#"
                                    key={index}
                                    className="block rounded-md border border-zinc-800 bg-zinc-900 px-4 py-3 text-zinc-200 hover:border-blue-500/50 hover:bg-zinc-800 transition">
                                    {/* {list.name} */}
                                </Link>
                            ))}
                        </div>

                        <Link
                            href={route('list')}
                            aria-label="Add list"
                            className="absolute bottom-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-2xl leading-none font-light text-white shadow-lg shadow-blue-500/20 hover:bg-blue-400 hover:scale-105 transition">
                            +
                        </Link>
                    </div>

                    {/* Lists */}
                    <div className="relative rounded-lg border border-purple-500/40 bg-neutral-950 overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-purple-500/30 bg-purple-500/10">
                            <h2 className="text-lg font-semibold text-purple-400">
                                Tasks
                            </h2>

                            <Link
                                href={route('tasks')}
                                className="text-sm text-purple-400 hover:text-purple-300"
                            >
                                View all
                            </Link>
                        </div>

                        {tasks?.length === 0 || !tasks && (
                            <p className="text-zinc-400 text-sm text-center py-10">
                                No tasks found. Click the + button to add a new task.
                            </p>
                        )}

                        <div className="h-80 overflow-y-auto p-4 space-y-2">
                            {tasks?.map((task, index) => (
                                // How should these routes be genereated? http? inline href?
                                <Link
                                    href="#"
                                    key={index}
                                    className="block rounded-md border border-zinc-800 bg-zinc-900 px-4 py-3 text-zinc-200 hover:border-blue-500/50 hover:bg-zinc-800 transition">
                                    {/* {task.name} */}
                                </Link>
                            ))}
                        </div>

                        <Link
                            href={route('task')}
                            aria-label="Add task"
                            className="absolute bottom-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 text-2xl leading-none font-light text-white shadow-lg shadow-purple-500/20 hover:bg-purple-400 hover:scale-105 transition">
                            +
                        </Link>
                    </div>

                </div>
            ) : (
                <div className="flex justify-center gap-4">
                    <Link
                        href={route('login')}
                        className="px-6 py-2.5 w-40 text-center rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium transition"
                    >
                        Login
                    </Link>

                    <Link
                        href={route('register')}
                        className="px-6 py-2.5 w-40 text-center rounded-md bg-purple-500 hover:bg-purple-600 text-white font-medium transition"
                    >
                        Register
                    </Link>
                </div>
            )}
        </div>
    );
}