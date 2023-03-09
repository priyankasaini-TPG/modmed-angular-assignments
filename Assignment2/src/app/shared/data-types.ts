export interface ISignUp{
    username: string,
    password: string,
    email: string
}

export interface ILogin{
    email: string,
    password: string
}

export interface IProduct{
    pname: string,
    expiry: Date,
    stock: number,
    // heading: string,
    // subheading: string,
    // tags: string,

}