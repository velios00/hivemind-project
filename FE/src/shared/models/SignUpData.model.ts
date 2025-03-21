import { InputField } from './InputField.model';

export interface SignUpData {
    username: InputField<string>;
    password: InputField<string>;
    confirmPassword: InputField<string>;
    }