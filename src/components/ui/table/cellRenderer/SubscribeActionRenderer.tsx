// import {useDispatch} from "react-redux";
// import {modal} from "../../../store/modules/modal";
import {useEffect, useState} from "react";

export type SubscribeActionRendererProps = {
    title: string
    data: any
}

export function SubscribeActionRenderer(subscribeActionRendererProps: SubscribeActionRendererProps) {
    // const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (subscribeActionRendererProps?.title == "nibssProduct" && subscribeActionRendererProps?.data?.nibssProductStatus === "INACTIVE") {
            setShow(true);
        }
    }, []);

    return (
        <div className="table_column is-width-large" role={"cell"}
             style={{display: 'flex', gap: '15px', width: "100%", height: "100%"}}>
            {
                show ?
                    <a className="table1_link"
                       onClick={() => {
                           // dispatch(modal.mutation.setIsSubscribe(true))
                       }}
                    >Subscribe</a>
                    :
                    <></>
            }
        </div>
    );
}
