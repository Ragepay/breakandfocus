import { ServiceTypes } from "@/types";
import services from "@/services";

const useFetchData = () => {
    const fetchData = async <T extends keyof ServiceTypes>(service: T, data: ServiceTypes[T]) => {
        try {
            return { status: true as const, response: (await services[service](data)).data, error: null, message: "" };
        } catch (error) {
            const message =
                (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
                (error as Error)?.message ||
                "Ocurrió un error inesperado.";
            return { status: false as const, response: null, error, message };
        }
    };
    return { fetchData };
};

export default useFetchData;
