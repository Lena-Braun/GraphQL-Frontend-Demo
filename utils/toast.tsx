import { useToast, UseToastOptions } from "@chakra-ui/react";

interface ToastHook {
    success: (title: string, description?: string) => void;
    error: (title: string, description?: string) => void;
    warning: (title: string, description?: string) => void;
    info: (title: string, description?: string) => void;
}

function CToast(): ToastHook {
    const toast = useToast();

    const showToast = (status: UseToastOptions['status'], title: string, description?: string) => {
        toast({
            title,
            description,
            status,
            duration: 5000,
            isClosable: true,
            position: 'top-right'
        });
    };

    return {
        success: (title, description) => showToast('success', title, description),
        error: (title, description) => showToast('error', title, description),
        warning: (title, description) => showToast('warning', title, description),
        info: (title, description) => showToast('info', title, description),
    };
}

export default CToast;
