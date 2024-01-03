import React, {ComponentType} from "react";

export type ModalProps<Props> = {
    closeModal: () => void
} & Props

export type ModalDictionary = {
    [key: string]: ComponentType<ModalProps<any>>
}

export type ClonedModalDictionary = {
    [key: string]: React.ReactElement<ModalProps<any>>
}

export type ModalOptions = {
    children: React.ReactNode
    Modals?: ModalDictionary
}

export type ModalContextProps = {
    openModal: <T extends ModalProps<any>>(name: string, modalProps?: Partial<T>) => number
    closeAllModals: () => void
    closeModal: (id: number) => void
}