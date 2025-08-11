import { useSession } from "next-auth/react";

export const usePermissions = () => {
    const { data: session } = useSession();

    // A função hasPermission verifica se há uma permissão especifica no array do usuario
    const hasPermission = (permission: string): boolean => {
        //Retorn false se não houver sessão ou permissões.
        if(!session?.user?.permissions) {
            return false
        }
        return session.user.permissions.includes(permission);
    }
    return {hasPermission}
}