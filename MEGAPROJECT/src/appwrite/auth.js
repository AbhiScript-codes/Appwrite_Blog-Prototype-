import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        const userAccount = await this.account.create({
                userId: ID.unique(),
                email,
                password,
                name
            });

        if (userAccount) return this.login({ email, password });
        return userAccount;
    }

    async login({ email, password }) {
        return this.account.createEmailPasswordSession({
                email,
                password
            });
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            if (error.code !== 401) console.error("Appwrite getCurrentUser error:", error);

            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Appwrite logout error:", error);
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;
