
import React from 'react';

interface PanicButtonProps {
    children: React.ReactNode;
    className?: string;
}

const PanicButton: React.FC<PanicButtonProps> = ({ children, className }) => {
    const handlePanic = () => {
        try {
            localStorage.clear();
            sessionStorage.clear();
        } catch (e) {
            console.error("Could not clear storage:", e);
        }
        window.location.href = 'https://www.google.com';
    };

    return (
        <button onClick={handlePanic} className={className}>
            {children}
        </button>
    );
};

export default PanicButton;
