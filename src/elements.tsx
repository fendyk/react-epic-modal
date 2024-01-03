import React from "react";
import {KeyboardAvoidingView, Platform, Pressable} from "react-native";
import styles from "./styles";

type WrapperElementProps = {
    isNative: boolean
    onClick: () => void
    children?: React.ReactNode
}
export const WrapperElement = (props: WrapperElementProps) => {
    if (props.isNative) {
        return <Pressable style={styles.wrapperElement} onPress={props.onClick}>{props.children}</Pressable>
    }
    return <div onClick={props.onClick} className={"wrapper-element"}>{props.children}</div>
}

type InnerWrapperElementProps = {
    isNative: boolean
    children?: React.ReactNode
}
export const InnerWrapperElement = (props: InnerWrapperElementProps) => {
    if (props.isNative) {
        return <KeyboardAvoidingView
            style={styles.wrapperElement}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >{props.children}</KeyboardAvoidingView>
    }
    return <div className={"inner-wrapper-element"}>{props.children}</div>
}

type ItemElementProps = {
    isNative: boolean
    onClick?: () => void
    children?: React.ReactNode
}
export const ItemElement = (props: ItemElementProps) => {
    if (props.isNative) {
        return <Pressable style={styles.wrapperElement} onPress={props.onClick}>{props.children}</Pressable>
    }
    return <div onClick={props.onClick} className={"wrapper-element"}>{props.children}</div>
}