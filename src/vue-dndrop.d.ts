/// <reference types='vue' />

declare module 'vue-dndrop' {
    import type {
        AllowedComponentProps,
        ComponentCustomProps,
        ComponentOptionsMixin,
        DefineComponent,
        NativeElements,
        PropType,
        VNodeProps,
    } from 'vue';

    type WithTemplateSlots<T, S> = T & {
        new(): {
            $slots: S
        }
    }

    export type DragResult = {
        isSource: boolean
        payload: unknown
        willAcceptDrop: boolean
    }

    export type DropResult<T> = {
        addedIndex: number | null
        element: HTMLElement
        payload: T
        removedIndex: number | null
    }

    export type DropNotAllowedResult = {
        payload: unknown
        container: object
    }

    export type Tag =
        | keyof NativeElements
        | { [K in keyof NativeElements]: { value: K; props: NativeElements[K] } }[keyof NativeElements]

    export type ContainerProps = {
        orientation?: 'horizontal' | 'vertical'
        behaviour?: 'move' | 'copy' | 'drop-zone' | 'contain'
        tag?: Tag
        groupName?: string
        lockAxis?: 'x' | 'y'
        dragHandleSelector?: string
        nonDragAreaSelector?: string
        dragBeginDelay?: number
        animationDuration?: number
        autoScrollEnabled?: boolean
        dragClass?: string
        dropClass?: string
        removeOnDropOut?: boolean
        dropPlaceholder?: boolean | Record<string, any>
        fireRelatedEventsOnly?: boolean
        getChildPayload?: (index: number) => unknown
        shouldAcceptDrop?: (sourceContainerOptions: object, payload: unknown) => boolean
        shouldAnimateDrop?: (sourceContainerOptions: object, payload: unknown) => boolean
        getGhostParent?: () => HTMLElement
    }

    export type ContainerEmits<T> = {
        dragStart?: (dragResult: DragResult) => void
        dragEnd?: (dragResult: DragResult) => void
        dragEnter?: () => void
        dragLeave?: () => void
        dropReady?: (dropResult: DropResult<T>) => void
        drop?: (dropResult: DropResult<T>) => void
        dropNotAllowed?: (dropNotAllowedResult: DropNotAllowedResult) => void
    }

    export const Container: WithTemplateSlots<
        DefineComponent<
            { [K in keyof ContainerProps]-?: { type: PropType<ContainerProps[K]> } },
            {},
            unknown,
            {},
            {},
            ComponentOptionsMixin,
            ComponentOptionsMixin,
            ContainerEmits<any>,
            string,
            VNodeProps & AllowedComponentProps & ComponentCustomProps,
            Readonly<ContainerProps> & { [K in keyof ContainerEmits<any> as `on${Capitalize<K>}`]?: ContainerEmits<any>[K] },
            {},
            {}
        >,
        Readonly<{ default(): any }>
    >;

    export type DraggableProps = {
        dragNotAllowed?: boolean
        tag?: Tag
    }

    export const Draggable: WithTemplateSlots<
        DefineComponent<
            { [K in keyof DraggableProps]-?: { type: PropType<DraggableProps[K]> } },
            {},
            unknown,
            {},
            {},
            ComponentOptionsMixin,
            ComponentOptionsMixin,
            {},
            string,
            VNodeProps & AllowedComponentProps & ComponentCustomProps,
            Readonly<DraggableProps>,
            {},
            {}
        >,
        Readonly<{ default(): any }>
    >;
}