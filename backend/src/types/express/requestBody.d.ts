export interface RequestBodyLogin {
    username:string
    password:string
    email:string
}
export interface RequestBodyRegister {
    username:string
    password:string
    email:string
    firstname:string
    lastname:string
    confirmpassword:string
}