"use server"
import { cookies } from 'next/headers'

const getCookie = async (name: string) => {
    const cookie = cookies();
    return (await cookie).get(name)?.value;
}

const deleteCookie = async (name: string) => {
    (await cookies()).delete(name)
};

export { getCookie, deleteCookie };