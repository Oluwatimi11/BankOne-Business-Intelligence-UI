const TextDecorator = ({decoratorType}: { decoratorType: "bullet" }) => {
    if (decoratorType == "bullet") {
        return (<div style={{
            width: "3px",
            height: "3px",
            borderRadius: "50%",
            backgroundColor: "black",
            border: "1px solid black"
        }}></div>)
    }

}
export default TextDecorator
