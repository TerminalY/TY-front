// color : [size, stock]
type ClothProperties = { [color: string]: [string, number][]}

export interface ICloth {
    name: string;
    type: string;
    price: Number;
    gender?: string;
    img?: string;
    properties: ClothProperties;
}

export interface IClothFilter {
    name?: string;
    type?: string;
    size?: string[];
    lowPrice?: Number;
    highPrice?: Number;
    color?: string;
    amount?: Number;
    gender?: string;
}

export interface IUser {
    userName: string;
    email: string;
    password: string;
}

export interface IUserChoosen {
    id?: Number;
    color: string;
    size: string;
}