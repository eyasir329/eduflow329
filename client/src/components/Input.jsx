import React from "react"
export default function Input({ type, id, name, label, placeholder, autofocus }) {
    return (
        <label className="text-gray-500 block mt-3">{label}
            <input
                autoFocus={autofocus}
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                className="rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100" />
        </label>
    )
}


