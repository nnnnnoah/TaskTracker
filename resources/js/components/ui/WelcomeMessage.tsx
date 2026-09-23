type WelcomeMessageProps = {
    isLoggedIn: boolean,
    userName?: string, // Optional prop for the user's name
};

export default function WelcomeMessage({isLoggedIn, userName}: WelcomeMessageProps) {
    return (
        <>
            <div className="text-center mb-10">
                {isLoggedIn ? (
                    <p>Welcome back, {userName}!</p>
                ) : (
                    <p>Welcome to your personalized task tracker. Please log in or create an account to continue.</p>
                )}
            </div>
        </>
    );
}