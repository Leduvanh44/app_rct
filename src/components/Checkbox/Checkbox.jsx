import { useRef, useEffect } from "react"

function Checkbox({ id, label, value, setValue, setValidateRows }) {
    const cbRef = useRef()

    const handleClick = (e) => {
        cbRef.current.click()
    }

    useEffect(() => {
        setValidateRows((prev) => ({
            ...prev,
            valid: prev.valid.includes(id) ? prev.valid : [...prev.valid, id],
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div
            data-component="Checkbox"
            className="group flex h-10 cursor-pointer items-center border-b-2 border-primary-3 hover:border-primary-2"
            onClick={handleClick}
        >
            <input
                ref={cbRef}
                type="checkbox"
                id={id}
                className="h-5 w-5"
                checked={value === "true" || value === true || value === 1 || value === "1"}
                onChange={(e) => setValue(e.target.checked.toString(), id)}
                onClick={(e) => e.stopPropagation()}
            />
            <label
                htmlFor={id}
                className="text-16-b ml-4 cursor-pointer group-hover:text-primary-2"
                onClick={(e) => e.stopPropagation()}
            >
                {label}
            </label>
        </div>
    )
}

export default Checkbox
