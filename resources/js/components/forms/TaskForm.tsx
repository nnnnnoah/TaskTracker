import { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Task } from '@/types';

// TypeScript interface: defines the shape of the form data.
// Passed to useForm<FormData> so TypeScript can catch typos on field names.
interface FormData {
    list: number;
    title: string;
    notes: string;
    due_date: Date;
    status: string;
    priority: string;
}

// TypeScript type: the keys of FormData. Used to ensure that field names are valid when unlocking fields.
type FieldName = keyof FormData;


// Base input styles shared by all fields. The border color and focus ring are set conditionally based on whether the field has an error.
// ensure this matches login form
const baseInput =
    'w-full rounded-none p-2 border transition disabled:cursor-not-allowed';

// Returns the full input class string based on whether the field has an error.
const inputClass = (hasError: boolean) =>
    `${baseInput} ${
        hasError
            ? 'bg-white text-black border-red-500 focus:border-red-500 focus:ring-red-200'
            : 'bg-white text-black border-neutral-400 focus:border-black'
    } disabled:bg-neutral-100 disabled:text-neutral-500`;

    // replace with fa or something or something
function PencilIcon() {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
    );
}

// Wraps a label, the control, and the error message. In edit mode, a pencil button sits beside the label while the field is locked.
function Field({
    id,
    label,
    locked,
    showPencil,
    onUnlock,
    error,
    children,
}: {
    id: string;
    label: string;
    locked: boolean;
    showPencil: boolean;
    onUnlock: () => void;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="w-full flex flex-col items-start mb-5">
            <div className="w-full flex items-center justify-between mb-2">
                <label htmlFor={id}>{label}</label>
                {showPencil && locked && (
                    <button
                        type="button"
                        onClick={onUnlock}
                        aria-label={`Edit ${label.toLowerCase()}`}
                        className="p-1 text-neutral-500 hover:text-black transition"
                    >
                        <PencilIcon />
                    </button>
                )}
            </div>
            {children}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
}

// <input type="date"> works with 'YYYY-MM-DD' strings, so convert to and from Date.
const toDateInputValue = (d: Date) =>
    d instanceof Date && !isNaN(d.getTime()) ? d.toISOString().slice(0, 10) : '';

export default function TaskForm({ mode, task }: { mode: 'create' | 'edit'; task?: Task }) {
    // Access the Inertia page object to get the current page's component and props.
    const page = usePage();

    // Check if the current page's component is 'Edit'. Otherwise we are creating a task.
    const isEditMode = page.component === 'Edit';

    // Choose the route to post to based on create vs. edit mode.
    const postRoute = isEditMode ? route('task.edit') : route('task.create');

    // Edit mode: fields start locked and are unlocked one at a time via the pencil icon.
    // Create mode: nothing is ever locked.
    // We use a Set to track which fields have been unlocked. This allows us to easily check if a field is locked and to unlock it without mutating state directly.
    const [unlocked, setUnlocked] = useState<Set<FieldName>>(new Set());

    // Returns true if the field is locked. A field is locked if we are in edit mode and it has not been unlocked yet.
    const isLocked = (field: FieldName) => isEditMode && !unlocked.has(field);

    const unlock = (field: FieldName, id: string) => {
        setUnlocked((prev) => new Set(prev).add(field));
        // Wait for the control to re-enable, then focus it.
        requestAnimationFrame(() => document.getElementById(id)?.focus());
    };

    // useForm is Inertia's form helper hook. It returns an object containing the form state and a set of methods for managing it.
    // We destructure the object immediately so we can use the values directly instead of writing form.data, form.setData, etc.
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm<FormData>({
            list: 0,
            title: '',
            notes: '',
            due_date: new Date(),
            status: '',
            priority: '',
        });

    const submit = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();

        // post() sends the form data to the given route via HTTP POST.
        // It automatically includes the current values of 'data' via closure.
        post(postRoute, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setUnlocked(new Set());
            },
        });
    };

    // Props shared by every field.
    const fieldProps = (field: FieldName) => ({
        id: field,
        locked: isLocked(field),
        showPencil: isEditMode,
        onUnlock: () => unlock(field, field),
        error: errors[field],
    });

    return (
        <form
            onSubmit={submit}
            className="w-full max-w-md mx-auto flex flex-col items-start space-y-4"
        >
            <Field label="List" {...fieldProps('list')}>
                <input
                    id="list"
                    type="number"
                    value={data.list}
                    disabled={isLocked('list')}
                    onChange={(e) => {
                        setData('list', Number(e.target.value));
                        clearErrors('list');
                    }}
                    className={inputClass(!!errors.list)}
                />
            </Field>

            <Field label="Title" {...fieldProps('title')}>
                <input
                    id="title"
                    type="text"
                    value={data.title}
                    disabled={isLocked('title')}
                    onChange={(e) => {
                        setData('title', e.target.value);
                        clearErrors('title');
                    }}
                    className={inputClass(!!errors.title)}
                />
            </Field>

            <Field label="Notes" {...fieldProps('notes')}>
                <textarea
                    id="notes"
                    rows={4}
                    value={data.notes}
                    disabled={isLocked('notes')}
                    onChange={(e) => {
                        setData('notes', e.target.value);
                        clearErrors('notes');
                    }}
                    className={inputClass(!!errors.notes)}
                />
            </Field>

            <Field label="Due date" {...fieldProps('due_date')}>
                <input
                    id="due_date"
                    type="date"
                    value={toDateInputValue(data.due_date)}
                    disabled={isLocked('due_date')}
                    onChange={(e) => {
                        // Ignore a cleared input so due_date never becomes an invalid Date.
                        if (!e.target.value) return;
                        setData('due_date', new Date(e.target.value));
                        clearErrors('due_date');
                    }}
                    className={inputClass(!!errors.due_date)}
                />
            </Field>

            <Field label="Status" {...fieldProps('status')}>
                <input
                    id="status"
                    type="text"
                    value={data.status}
                    disabled={isLocked('status')}
                    onChange={(e) => {
                        setData('status', e.target.value);
                        clearErrors('status');
                    }}
                    className={inputClass(!!errors.status)}
                />
            </Field>

            <Field label="Priority" {...fieldProps('priority')}>
                <input
                    id="priority"
                    type="text"
                    value={data.priority}
                    disabled={isLocked('priority')}
                    onChange={(e) => {
                        setData('priority', e.target.value);
                        clearErrors('priority');
                    }}
                    className={inputClass(!!errors.priority)}
                />
            </Field>

            <div className="w-full flex flex-col">
                <hr className="w-full border-t border-neutral-400 mb-5" />
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-amber-600 text-white font-medium py-2 px-4 rounded-none hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                    {processing
                        ? 'Saving...'
                        : isEditMode
                          ? 'Save changes'
                          : 'Create task'}
                </button>
            </div>
        </form>
    );
}