import axios from "axios";
import { makeAutoObservable } from "mobx";
import { API_URL } from "../http";
import { IUser } from "../models/IUser";
import { AuthResponse } from "../models/response/AuthResponse";
import AuthService from "../services/AuthService";

export default class Store{
    user = {} as IUser;
    isAuth = false;

    constructor(){
        makeAutoObservable(this);
    }

    setAuth(bool: boolean){
        this.isAuth = bool;
    }

    setUser(user: IUser){
        this.user = user;
    }

    async login(email: string, password: string){
        try {
            const response = await AuthService.login(email, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            if(e instanceof Error){
                console.log(e.message)
            }
            console.log('Unexpected erroafr', e)
            // console.log(e.response?.data?.message)
        }
    }

    async registration(email: string, password: string){
        try {
            const response = await AuthService.registration(email, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            if(e instanceof Error){
                console.log(e.message)
            }
            console.log('Unexpected error', e)
            // console.log(e.response?.data?.message)
        }
    }

    async logout(){
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e) {
            if(e instanceof Error){
                console.log(e.message)
            }
            console.log('Unexpected error', e)
            // console.log(e.response?.data?.message)
        }
    }

    async checkAuth(){
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            } catch (e) {
            if(e instanceof Error){
                console.log(e.message)
            }
            console.log('Unexpected error', e)
        }
    }
}