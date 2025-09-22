import {useCallback, useState} from "react";

type PopupState = {
    isOpen: boolean;
    referenceElement: HTMLElement | null;
};

const usePopup = (referenceElement: HTMLElement | null) => {
    const [popupState, setPopupState] = useState<PopupState>({
        isOpen: false,
        referenceElement: referenceElement,
    });

    const open = useCallback(() => {
        setPopupState((prevState) => ({
            ...prevState,
            isOpen: true,
        }));
    }, []);

    const close = useCallback(() => {
        setPopupState((prevState) => ({
            ...prevState,
            isOpen: false,
        }));
    }, []);

    return {
        isOpen: popupState.isOpen,
        referenceElement: popupState.referenceElement,
        open,
        close,
    };
};

export default usePopup;
