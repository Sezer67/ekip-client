export type FormValuesType = {
    firstName:string;
    lastName:string;
    username:string;
    email:string;
    gender:GenderType;
    password:string;
}

export enum FormValuesEnum {
    firstName = "firstName",
    lastName = "lastName",
    username = "username",
    email = "email",
    gender = "gender",
    password = "password",
}

export const errorMessages = {
    required:(label:string)=> `${label} is required!`,
    types:{
        email:`This is not a valid email!`
    }
}

type GenderType = "Male" | "Female";