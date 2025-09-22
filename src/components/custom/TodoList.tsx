import {CSSProperties, useState} from "react";
import BaseProgress from "@/components/ui/progress/BaseProgress";
import LightningQuickIcon from "@/components/icon/LightningQuickIcon";
import DropdownIcon from "@/components/icon/DropdownIcon";
import SuccessTickIcon from "@/components/icon/SuccessTickIcon";
import IconButton from "@/components/ui/button/IconButton";
import AngleRightIcon from "@/components/icon/AngleRightIcon";

export type TodoListProps = {
    // showProgress?: boolean;
    todoListName?: string;
    todoItems?: { isCompleted: boolean, itemName: string; onClick?: () => void; itemStyle?: CSSProperties }[]
}

const TodoListHeader = ({todoListName, todoItems, expandTodoList, setExpandTodoList}: TodoListProps & {
    setExpandTodoList: React.Dispatch<React.SetStateAction<boolean>>;
    expandTodoList: boolean
}) => {
    const todoItemsCompleted = todoItems?.filter((todoItem) => todoItem.isCompleted).length || 0;
    return (
        <div onClick={() => {
            setExpandTodoList((prevState) => !prevState)
        }} style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
        }}>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    gap: "1rem",
                    fontWeight: 500
                }}>
                    <LightningQuickIcon style={{width: "2em", height: "2em"}}/>
                    <p>{todoListName}</p>
                </div>
                {/*<IconButton icon={DropdownIcon} iconProps={{type: "closed"}}/>*/}
                <DropdownIcon type={!expandTodoList ? "closed" : "opened"}/>
            </div>
            <BaseProgress currentProgressValue={todoItemsCompleted} maximumProgressValue={todoItems?.length}
                          additionalProgressOptions={{height: ".75rem"}}
                          startProgressLabel={expandTodoList ? "Your Setup Progress" : ""}
                          endProgressLabel={expandTodoList ? `${parseInt((todoItemsCompleted / (todoItems?.length ?? 0) * 100).toString())}% complete` : ""}/>
        </div>
    )
}

const TodoListMain = ({todoItems}: { todoItems: TodoListProps["todoItems"] }) => {
    return (<div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
        {todoItems?.map((todoItem, index) => {
            return (
                <div className={"subtitle"} style={{
                    padding: "0 0 .8em 1.5em",
                    borderBottom: index == todoItems?.length - 1 ? "none" : "1px solid var(--gray--2)",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    gap: "1rem",
                    cursor: "pointer",
                    // zIndex: 29
                    // backgroundColor: "red"
                }} onClick={todoItem?.onClick}>
                    {todoItem.isCompleted ? <SuccessTickIcon/> : <div
                        style={{
                            width: "1.5em",
                            height: "1.5em",
                            borderRadius: "50%",
                            border: "2px solid var(--gray--2)"
                        }}/>}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        gap: "1rem",
                        // cursor: "pointer"
                    }}>
                        <p className={`${todoItem.isCompleted ? "" : "label"}`}
                           style={{textDecoration: todoItem.isCompleted ? "line-through" : "none"}}>{todoItem.itemName}</p>
                        <IconButton icon={AngleRightIcon}/>
                    </div>
                </div>
            )
        })}
    </div>)
}

const TodoList = (props: TodoListProps) => {

    const [expandTodoList, setExpandTodoList] = useState(true)

    return (<div style={{
        padding: "1rem",
        backgroundColor: "white",
        borderRadius: ".55em",
        border: "1px solid var(--gray--2)",
        display: 'flex',
        flexDirection: "column",
        gap: "2rem"
    }}>
        <TodoListHeader {...props} expandTodoList={expandTodoList}
                        setExpandTodoList={setExpandTodoList}/>
        {expandTodoList && <TodoListMain todoItems={props?.todoItems}/>}
    </div>)
}

export default TodoList
