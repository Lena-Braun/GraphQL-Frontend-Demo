// app/hooks/useRedirect.ts
import { useAppSelector } from './hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useRedirect = (path: string) => {
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            router.push(path);
        }
    }, [isAuthenticated, router, path]);
};

export default useRedirect;