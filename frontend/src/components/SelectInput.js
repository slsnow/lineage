import React from 'react';

export default function SelectInput({ label, name, options, value, onChange }) {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <select name={name} className="form-select" value={value} onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}