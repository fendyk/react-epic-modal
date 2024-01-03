import React from "react";
import {KeyboardAvoidingView, Platform, Pressable} from "react-native";
import styles from "./styles";
import {isNative} from "./index";

type WrapperElementProps = {
    onClick: () => void
    children?: React.ReactNode
}
export const WrapperElement = (props: WrapperElementProps) => {
    if (isNative) {
        return <Pressable style={styles.wrapperElement} onPress={props.onClick}>{props.children}</Pressable>
    }
    return <div onClick={props.onClick} className={"wrapper-element"}>{props.children}</div>
}

type InnerWrapperElementProps = {
    children?: React.ReactNode
}
export const InnerWrapperElement = (props: InnerWrapperElementProps) => {
    if (isNative) {
        return <KeyboardAvoidingView
            style={styles.wrapperElement}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >{props.children}</KeyboardAvoidingView>
    }
    return <div className={"inner-wrapper-element"}>{props.children}</div>
}

type ItemElementProps = {
    onClick?: () => void
    children?: React.ReactNode
}
export const ItemElement = (props: ItemElementProps) => {
    if (isNative) {
        return <Pressable style={styles.wrapperElement} onPress={props.onClick}>{props.children}</Pressable>
    }
    return <div onClick={props.onClick} className={"wrapper-element"}>{props.children}</div>
}