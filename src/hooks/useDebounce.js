import { useState, useEffect } from "react"

const useDebounce = (value, delay) => {
    const [debounce, setDebounce] = useState(value)

    useEffect(() => {
        const dId = setTimeout(() => setDebounce(value), delay)

        return () => clearTimeout(dId)
    }, [value, delay])

    return debounce
}

export default useDebounce
