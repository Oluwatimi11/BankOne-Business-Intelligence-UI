declare module '@bedrock-layout/use-forwarded-ref' {
    import {MutableRefObject} from 'react';
    export default function useForwardedRef<T>(ref: React.Ref<T>): MutableRefObject<T>;
}
