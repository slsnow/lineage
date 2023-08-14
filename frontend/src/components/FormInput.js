import React from 'react';
import './FormInput.css';

export default function FormInput({label, type, options, onChange}) {
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
                onChange={e => onChange && onChange(e.target.value)} 
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
          onChange={e => onChange && onChange(e)}
        />
      </div>
    );
}