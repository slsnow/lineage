import React from 'react';
import './FormInput.css';

export default function FormInput({label, type, options, onOptionChange}) {
    if (type === 'radio' && options) {
      return (
        <div className="form-input">
          <label>{label}</label>
          <div>
            {options.map((option, index) => (
              <label key={index}>
                <input type="radio" value={option} name={label}
                  onChange={() => onOptionChange && onOptionChange(option)} />
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
      <input className="form-input" type={type} />
    </div>
  );
}