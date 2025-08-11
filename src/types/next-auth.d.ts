import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth'{
    interface Session {
        user: {
            accessToken?: string;
            role?: string;
            company_id?: string;
            permissions?: string[];
        }& DefaultSession['user']
    }

    interface User {
        accessToken?: string;
        role?: string;
        company_id?: string;
        permissions?: string[];
    }
}

declare module 'next-auth/jwt'{
    interface JWT {
        accessToken?: string;
        role?: string;
        company_id?: string;
        permissions?: string[];
    }
}