import React from 'react';
import './form-elements.css';

interface SelectOptionProps {
  options: { value: string, label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  placeholder: string;
}

const SelectOption: React.FC<SelectOptionProps> = ({ options, onChange, value, placeholder }) => {
  return (
    <div className='form-element__container'>
      <select value={value} onChange={onChange} className='select-field'>
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectOption;
