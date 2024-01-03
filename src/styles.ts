import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    wrapperElement: {
        position: 'absolute',
        width: '100%',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 99,
    },
    innerWrapperElement: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    itemElement: {
        width: '100%',
        height: '100%',
    },
});

export default styles;