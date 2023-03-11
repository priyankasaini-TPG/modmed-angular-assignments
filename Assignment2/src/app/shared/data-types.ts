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
    heading: string,
    subheading: string,
    tags: string[],
    description: string,
    mindays: Date,
    maxdays: Date,
    id: string
}

export interface IModes{
    edit: boolean,
    create: boolean,
    delete: boolean,
    search: boolean,
    id: string
}