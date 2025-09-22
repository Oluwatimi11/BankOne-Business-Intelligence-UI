import CopyIcon from "@/components/icon/CopyIcon";
import {CSSProperties, useEffect, useRef, useState} from "react";
import BasePopup from "@/components/ui/popup/BasePopup";

const CopyToClipboard = ({copyInput}: {
    copyInput: string;
    showText?: boolean;
    copyPlaceholderLabel?: string;
    customCopyIcon?: React.FC<SVGSVGElement>
    iconSize?: number;
    iconStyle?: CSSProperties;
}) => {
    const [isCopiedClicked, setIsCopiedClicked] = useState<boolean>(false)
    const referenceElement = useRef<null>(null);
    // const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    useEffect(() => {
        if (isCopiedClicked) {
            const timeoutID = setTimeout(() => {
                setIsCopiedClicked(false);
            }, 3000);

            // Cleanup function to clear the timeout when component unmounts or isCopiedClicked changes
            return () => clearTimeout(timeoutID);
        }
    }, [isCopiedClicked]);

    return (
        <div className={"copyIcon"} ref={referenceElement}>
            <CopyIcon width={50} height={50} style={{cursor: "pointer"}}
                      onClick={async () => {
                          if (copyInput) {
                              setIsCopiedClicked(true)
                              await navigator.clipboard.writeText(copyInput);
                          }
                      }}
            />
            {isCopiedClicked &&
                <BasePopup referenceElement={referenceElement.current} isOpen={isCopiedClicked}>
                    <p className={"subtitle label"}>Copied!</p>
                </BasePopup>
            }
        </div>
    )
}

export default CopyToClipboard
