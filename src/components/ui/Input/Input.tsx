import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
                                                            label,
                                                            error,
                                                            required = false,
                                                            className = '',
                                                            ...props
                                                        }, ref) => {
    const inputClasses = `
    w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent
    ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}
    ${className}
  `.trim();

    return (
        <div className="space-y-1">
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <input
                ref={ref}
                className={inputClasses}
                {...props}
            />

            {error && (
                <p className="text-sm text-red-600 mt-1">
                    {error}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;