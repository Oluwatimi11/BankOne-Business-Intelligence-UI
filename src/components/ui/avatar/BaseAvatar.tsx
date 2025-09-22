"use client"
import {Avatar, AvatarProps} from "@fluentui/react-avatar";

export type BaseAvatarProps = AvatarProps;
const BaseAvatar = (props: BaseAvatarProps) => {

    return (<Avatar {...props}/>)
}

export default BaseAvatar
