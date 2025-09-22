"use client"

import React, {useEffect, useRef, useState} from 'react';
import {ICellRendererParams} from 'ag-grid-community';
import ThreeDotsMenuIcon from "@/components/icon/ThreeDotsMenuIcon";
import MenuOptionsPopup, {MenuOptionsPopupProps} from "@/components/ui/popup/MenuOptionsPopup";

export type RowOptionsActionRendererProps = ICellRendererParams & {
    rowOptions: MenuOptionsPopupProps["menuOptions"]
}

const RowOptionsActionRenderer: React.FC<RowOptionsActionRendererProps> = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    useEffect(() => {
        // Force AG Grid to refresh the cell size when the popup opens or closes
        if (props.api && props.column) {
            props.api.refreshCells({
                force: true,
                columns: [props.column],
                rowNodes: [props.node]
            });
        }
    }, [isOpen]);

    return (
        <div ref={containerRef}
             style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <ThreeDotsMenuIcon onClick={handleOpen}/>
            <MenuOptionsPopup
                referenceElement={containerRef.current}
                isOpen={isOpen}
                onClose={handleClose}
                menuOptions={props.rowOptions}
                data={props.data}
                // style={{position: 'absolute', zIndex: 1000}}
            />
        </div>
    );
}

export default RowOptionsActionRenderer;
