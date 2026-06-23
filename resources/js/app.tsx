import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import type { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/AppLayout';
import { route as ziggyRoute } from 'ziggy-js';

declare global {
    interface Window {
        route: typeof ziggyRoute;
    }
    const route: typeof ziggyRoute; 
}

window.route = ((name: any, params: any, absolute: any) =>
    ziggyRoute(name, params, absolute, (window as any).Ziggy)) as typeof ziggyRoute;

const pages = import.meta.glob('./pages/**/*.tsx');

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

type InertiaPage = {
    default: {
        layout?: (page: ReactNode) => ReactNode;
    };
};

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: async (name) => {
        const page = await resolvePageComponent(
            `./pages/${name}.tsx`,
            pages
        ) as InertiaPage;
    
        page.default.layout ??= (page: ReactNode) => (
            <AppLayout>{page}</AppLayout>
        );
    
        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <App {...props} />
            </StrictMode>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
