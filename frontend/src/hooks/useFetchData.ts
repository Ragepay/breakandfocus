import { ServiceTypes } from "@/types";
import services from "@/services";

const useFetchData = () => {
    const fetchData = async <T extends keyof ServiceTypes>(service: T, data: ServiceTypes[T]) => {
        try {
            // services[service] es una unión de funciones; el cast permite invocarla con su data
            const call = services[service] as (d: ServiceTypes[T]) => Promise<{ data: unknown }>;
            return { status: true as const, response: (await call(data)).data, error: null, message: "" };
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
