import React from 'react'

const FormInput = ({ label, value, onChange }) => (
  <div>
    {label}: <input value={value} onChange={onChange} />
  </div>
)

const BlogForm = ({ onSubmit, inputs }) => {
  const formInputs = () => inputs.map(
    ({ label, value, onChange }) => <FormInput key={label} label={label} value={value} onChange={onChange} />
  )

  return (
    <form onSubmit={onSubmit}>
      {formInputs()}
      <div>
        <button type="submit">add blog</button>
      </div>
    </form>
  )
}

export default BlogForm