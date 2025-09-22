import React, {CSSProperties, useEffect, useMemo} from "react";
import "./input.css"

type OtpInputProps = {
    numberOfInputs?: number;
    onOtpInputsFilled?: (otp: string) => void;
    onOtpValueChange?: (otp: string[]) => void;
    containerStyle?: CSSProperties;
    inputStyle?: CSSProperties;
    disableInputs?: boolean;
    inputText: string[];
    setInputText: React.Dispatch<React.SetStateAction<string[]>>
    inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
};
export const BaseOtpInput = ({
                                 numberOfInputs = 6,
                                 containerStyle,
                                 onOtpInputsFilled,
                                 onOtpValueChange,
                                 inputStyle,
                                 disableInputs,
                                 inputProps,
                                 inputText,
                                 setInputText,
                             }: OtpInputProps) => {
    // const [inputText, setInputText] = useState([...Array<string>(numberOfInputs)].fill(""));
    const regex = useMemo(() => {
        return new RegExp(/^\d+$/);
    }, []);

    const focusToNextInput = (target: HTMLElement) => {
        const nextElementSibling = target.nextElementSibling as HTMLInputElement | null;
        if (nextElementSibling) {
            nextElementSibling.focus();
        }
    };
    const focusToPrevInput = (target: HTMLElement) => {
        const previousElementSibling = target.previousElementSibling as HTMLInputElement | null;
        if (previousElementSibling) {
            previousElementSibling.focus();
        }
    };

    const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const {key} = e;
        const target = e.target as HTMLInputElement;

        if (key === "ArrowRight" || key === "ArrowDown") {
            e.preventDefault();
            return focusToNextInput(target);
        }

        if (key === "ArrowLeft" || key === "ArrowUp") {
            e.preventDefault();
            return focusToPrevInput(target);
        }

        if (key === "Backspace") {
            e.preventDefault();
            setInputText((prevState) => {
                const newInputText = [...prevState]; // Create a new array
                newInputText[index] = "";
                // console.log(newInputText)
                return newInputText;
            });
            return focusToPrevInput(target);
        }

        if (e.key !== "Backspace" || target.value !== "") {
            return;
        }
        focusToPrevInput(target);
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const target = e.target;
        const targetValue = target.value.trim();
        const isTargetValueDigit = regex.test(targetValue);
        if (!isTargetValueDigit || targetValue == "") {
            return;
        }
        const targetValueLength = targetValue.length;

        if (targetValueLength === 1) {
            setInputText((prevState) => {
                const newInputText = [...prevState]; // Create a new array
                newInputText[index] = targetValue;
                // console.log(newInputText)
                return newInputText;
            });
            focusToNextInput(target);
        }
    };

    const handleOnPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, numberOfInputs);
        if (regex.test(pastedData)) {
            setInputText(() => {
                return pastedData.split("");
            });
        }
    };

    useEffect(() => {
        onOtpValueChange?.(inputText);
    }, [inputText, numberOfInputs, onOtpValueChange]);

    useEffect(() => {
        if (inputText.length === numberOfInputs && inputText.every(text => text !== "")) {
            onOtpInputsFilled?.(inputText.join(""));
        }
    }, [inputText, numberOfInputs, onOtpInputsFilled]);

    return (
        <div
            className={""}
            style={containerStyle}
        >
            {[...Array(numberOfInputs)]?.map((_, i) => {
                return (
                    <input
                        disabled={disableInputs}
                        type={"text"}
                        inputMode="text"
                        placeholder={"_"}
                        pattern="\d{1}"
                        value={inputText[i]}
                        key={i}
                        onKeyDown={(e) => inputOnKeyDown(e, i)}
                        onChange={(e) => handleOnChange(e, i)}
                        onPaste={handleOnPaste}
                        maxLength={1}
                        className={"baseOtpInput"}
                        {...inputProps}
                        style={{...inputStyle}}
                        aria-label={`OTP input ${i + 1}`}
                    />
                );
            })}
        </div>
    );
};
