import { AxiosResponse } from 'axios';
import { API } from '../axios/Interceptors';
import { AuthRequest } from '../shared/models/AuthRequest.model';
import { AuthResponse } from '../shared/models/AuthResponse.model';
import { endpoints } from '../shared/constants/api';
import { User } from '../shared/models/User.model';

export function signUp(authRequest: AuthRequest): Promise<AxiosResponse<User>> {
    return API.post(`${endpoints.auth}/signup`, authRequest);
}

export function signIn(authRequest: AuthRequest): Promise<AxiosResponse<AuthResponse>> {
    return API.post(`${endpoints.auth}/signin`, authRequest);
}