export type UserRegisterType = {
    firstName:string;
    lastName:string;
    username:string;
    password:string;
    email:string;
}

export type UserLoginType = {
    username?:string;
    email?:string;
    password:string;
}

export type ResponseLoginType = {
    id:string;
    firstName:string;
    lastName:string;
    username:string;
    password:string;
    email:string;
    token:string;    
}