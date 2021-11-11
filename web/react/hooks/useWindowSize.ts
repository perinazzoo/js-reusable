import React from 'react'

export default function useWindowSize (): number[] {
    const [size, setSize] = React.useState([0, 0])
    React.useLayoutEffect(() => {
        function updateSize (): void {
            setSize([window.innerWidth, window.innerHeight])
        }
        window.addEventListener('resize', updateSize)
        updateSize()
        return () => window.removeEventListener('resize', updateSize)
    }, [])
    return size
}
