import React from 'react';

const Dropdown = ({ label, value, options, onChange }) => {
  return (
    <div className="dropdown">
      <label>{label}:</label>
      <select value={value} onChange={(e) => onChange(Number(e.target.value))}>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
