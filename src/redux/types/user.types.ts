export type UserStateType = {
    user:UserType
}

export type UserType = {
    id:string;
    firstName:string;
    lastName:string;
    username:string;
    email:string;
    token:string |undefined;
}