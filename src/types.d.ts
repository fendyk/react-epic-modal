import React, {ComponentType} from "react";

export declare type ModalProps<Props> = {
    closeModal: () => void
} & Props

export declare type ModalDictionary = {
    [key: string]: ComponentType<ModalProps<any>>
}

export declare type ClonedModalDictionary = {
    [key: string]: React.ReactElement<ModalProps<any>>
}

export declare type ModalOptions = {
    children: React.ReactNode
    isNative?: boolean
    Modals?: ModalDictionary
}

export declare type ModalContextProps = {
    openModal: <T extends ModalProps<any>>(name: string, modalProps?: Partial<T>) => number
    closeAllModals: () => void
    closeModal: (id: number) => void
}