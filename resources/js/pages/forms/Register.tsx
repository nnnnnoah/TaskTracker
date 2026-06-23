import { FormEvent } from 'react';
import { useForm } from '@inertiajs/react';

// Definition of the form's fields, used as a parameter for Intertia's useForm function
interface FormData {
    name: string;
    email: string;
    password: string;
}

export default function Register() {
    // Destructure the useForm response object so we can access the methods & variables directly
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        clearErrors,
    }
    
    // Pass the form definition to the function as the interface, and define the inital state for each field 
    = useForm<FormData>({
        name: '',
        email: '',
        password: '',
    });

    // 
    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('forms.register'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <div>
                <label htmlFor="name">Name</label>

                <input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => {
                        setData('name', e.target.value);
                        clearErrors('name');
                    }}
                />

                {errors.name && (
                    <p className="text-red-500">{errors.name}</p>
                )}
            </div>

            <div>
                <label htmlFor="email">Email</label>

                <input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => {
                        setData('email', e.target.value);
                        clearErrors('email');
                    }}
                />

                {errors.email && (
                    <p className="text-red-500">{errors.email}</p>
                )}
            </div>

            <div>
                <label htmlFor="password">Password</label>

                <input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => {
                        setData('password', e.target.value);
                        clearErrors('password');
                    }}
                />

                {errors.password && (
                    <p className="text-red-500">{errors.password}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={processing}
                className="btn btn-primary"
            >
                {processing ? 'Saving...' : 'Save'}
            </button>
        </form>
    );
}