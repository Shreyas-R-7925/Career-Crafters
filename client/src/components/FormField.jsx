import React from 'react';

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  onChange,
}) => (
  <div className='mb-5'>
    <div className="flex items-center gap-2 mb-2">
      <label
        htmlFor={name}
        className="block text-base text-gray-900"
      >
        {labelName}
      </label>
    </div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
    />  
  </div>
);

export default FormField;