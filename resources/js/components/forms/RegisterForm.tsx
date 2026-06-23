import { useForm } from '@inertiajs/react';

// TypeScript interface: defines the shape of the form data
// Passed to useForm<FormData> so TypeScript can catch typos on field names
interface FormData {
    username: string;
    password: string;
}

export default function RegisterForm() {
    // useForm is Inertia's form helper hook. It returns an object containing the form state and a set of methods for managing it
    // We destructure the object immediately so we can use the values directly instead of writing e.g. form.data, form.setData, etc
    const {
        data,      
        setData,   
        post,
        processing,
        errors,    
        reset,     
        clearErrors
    } = useForm<FormData>({
        username: '',
        password: '',
    });

    const submit = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();

        // post() sends the form data to the given route via HTTP POST
        // It automatically includes the current values of 'data' via closure
        post(route('forms.register'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <form
            onSubmit={submit}
            className="w-full max-w-md mx-auto flex flex-col items-start space-y-4"
        >
            <div className="w-full flex flex-col items-start">
                <label htmlFor="name" className="mb-1">
                    Username
                </label>
                <input
                    id="name"
                    type="text"
                    value={data.username}
                    onChange={(e) => {
                        setData('username', e.target.value);
                        clearErrors('username');
                    }}
                    className="w-full bg-white text-black border-0 rounded-none p-2"
                />
                {errors.username && (
                    <p className="text-red-500">{errors.username}</p>
                )}
            </div>
    
            <div className="w-full flex flex-col items-start">
                <label htmlFor="password" className="mb-1">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => {
                        setData('password', e.target.value);
                        clearErrors('password');
                    }}
                    className="w-full bg-white text-black border-0 rounded-none p-2"
                />
                {errors.password && (
                    <p className="text-red-500">{errors.password}</p>
                )}
            </div>

            <div className="w-full flex flex-col items-start">
                <label htmlFor="password" className="mb-1">
                    Confirm Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => {
                        setData('password', e.target.value);
                        clearErrors('password');
                    }}
                    className="w-full bg-white text-black border-0 rounded-none p-2"
                />
                {errors.password && (
                    <p className="text-red-500">{errors.password}</p>
                )}
            </div>

            <div className="w-full flex flex-col">

                <hr className="w-full border-t border-neutral-400 my-5" />
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-cyan-600 text-white font-medium py-2 px-4 rounded-none hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                    {processing ? 'Saving...' : 'Save'}
                </button>
            </div>
        </form>
    );
}