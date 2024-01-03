import React, {type ComponentType} from "react";
import {KeyboardAvoidingView, Platform, Pressable, View} from "react-native";

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

const defaultModalContextProps: ModalContextProps = {
    openModal: () => -1,
    closeAllModals: () => {
    },
    closeModal: (id) => {
    }
}

const ModalContext = React.createContext<ModalContextProps>(defaultModalContextProps)

export const useModal = () => {
    const context = React.useContext(ModalContext)
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider')
    }
    return context
}

const ModalProvider: React.FC<ModalOptions> = (props: ModalOptions) => {
    const {Modals} = props

    const [idIndex, setIdIndex] = React.useState<number>(0)
    const [ClonedModals, setClonedModals] =
        React.useState<ClonedModalDictionary>({})

    /**
     * Open a modal by name
     * @param name
     * @param modalProps
     */
    const openModal = <T extends ModalProps<any>>(name: string, modalProps?: Partial<T>): number => {
        if(!Modals) {
            console.error("Modals are not defined. Please provide at least one Modal in the provider.")
            return -1
        }
        if(!Modals[name]) {
            console.error("Modal with name '" + name + "' does not exist. Possible modals: " + Object.keys(Modals).join(", ") + ".")
            return -1
        }

        const _modalProps: ModalProps<any> = {
            closeModal: () => closeModal(idIndex)
        }
        const modalComponent = React.createElement(Modals[name], {..._modalProps, ...modalProps})
        setClonedModals({...ClonedModals, [idIndex]: modalComponent})
        setIdIndex(idIndex + 1)

        return idIndex
    }

    /**
     * Close all modals
     */
    const closeAllModals = () => {
        setClonedModals({})
    }

    /**
     * Close a modal by id
     * @param id
     */
    const closeModal = (id: number) => {
        const newModals = {...ClonedModals}
        delete newModals[id]
        setClonedModals(newModals)
    }

    return (
        <ModalContext.Provider value={{openModal, closeAllModals, closeModal}}>
            {props.children}
            {Object.keys(ClonedModals).length > 0 &&
                <Pressable
                    onPress={() => {
                        const entries = Object.entries(ClonedModals);
                        const [key, value] = entries[entries.length - 1];
                        closeModal(parseInt(key))
                    }}
                    className={"absolute w-full top-0 left-0 right-0 bottom-0 z-100"}
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={{backgroundColor: "rgba(0,0,0,0.5)"}}
                        className={"flex-1 flex-row justify-center items-end"}>
                        {Object.keys(ClonedModals).map((value, index, array) => (
                            <Pressable key={index + 1} className={"w-full h-full"}>
                                {ClonedModals[value]}
                            </Pressable>
                        ))}
                    </KeyboardAvoidingView>
                </Pressable>
            }
        </ModalContext.Provider>
    )
}

export default ModalProvider