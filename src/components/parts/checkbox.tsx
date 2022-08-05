import React from 'react'

export type Props = {
  name: string
  id: string
  label: string
  checked: boolean
}

export const Checkbox: React.FC<Props> = ({ id, name, label, checked }) => {
  return (
    <div>
      <label htmlFor={id}>
        <input id={id} name={name} type='checkbox' checked={checked} />
        {label}
      </label>
      <span>編集</span>
    </div>
  )
}
