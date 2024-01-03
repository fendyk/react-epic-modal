import React, {type ComponentType} from "react";
import {InnerWrapperElement, ItemElement, WrapperElement} from "./elements";
import {ClonedModalDictionary, ModalContextProps, ModalOptions, ModalProps} from "./types";

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
    const {Modals, isNative} = props

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
                <WrapperElement
                    isNative={isNative ?? false}
                    onClick={() => {
                        const entries = Object.entries(ClonedModals);
                        const [key, value] = entries[entries.length - 1];
                        closeModal(parseInt(key))
                    }}
                >
                    <InnerWrapperElement isNative={isNative ?? false}>
                        {Object.keys(ClonedModals).map((value, index, array) => (
                            <ItemElement
                                key={index + 1}
                                isNative={false}
                            >
                                {ClonedModals[value]}
                            </ItemElement>
                        ))}
                    </InnerWrapperElement>
                </WrapperElement>
            }
        </ModalContext.Provider>
    )
}

export default ModalProvider