type WelcomeMessageProps = {
    isLoggedIn: boolean,
};

export default function WelcomeMessage({isLoggedIn}: WelcomeMessageProps) {
    return (
        <>
            <div className="text-center">
                {isLoggedIn ? (
                    <p>Welcome back, username!</p>
                ) : (
                    <p>Welcome to your personalized task tracker. Please log in or create an account to continue.</p>
                )}
            </div>
        </>
    );
}