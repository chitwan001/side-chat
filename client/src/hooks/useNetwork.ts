import { useIsOnline } from "react-use-is-online";
export function useNetwork() {
    const { isOnline, isOffline, error } = useIsOnline();
    return {
        isOnline, isOffline, networkError: error
    }
}