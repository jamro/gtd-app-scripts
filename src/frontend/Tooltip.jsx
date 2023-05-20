
export const Tooltip = ({children, text}) => {
    const childRef = React.useRef()

    React.useEffect(() => {
        const t = new bootstrap.Tooltip(childRef.current, {
            title: text,
            placement: "top",
            trigger: "hover"
        })
        return () => t.dispose()
    }, [text])

    return React.cloneElement(children, { ref: childRef })
}