import React from 'react';
import './FormInput.css';

export default function FormInput({label, type, options, onChange}) {
    const handleChange = (e) => {
        if (onChange) {
            onChange(e);
        }
    };

    if (type === 'radio' && options) {
        return (
            <div className="form-input">
                <label>{label}</label>
                <div>
                    {options.map((option, index) => (
                        <label key={index}>
                            <input 
                                type="radio" 
                                value={option} 
                                name={label}
                                onChange={handleChange} 
                            />
                            {option}
                        </label>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="form-group">
            <label>{label}</label>
            <input 
                className="form-input" 
                type={type} 
                onChange={handleChange}
            />
        </div>
    );
}
