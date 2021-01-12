// color : [size, stock]
type ClothProperties = { [color: string]: [string, number][]}

export interface ICloth {
    _id: string;
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
    size?: string;
    lowPrice?: Number;
    highPrice?: Number;
    color?: string;
    amount?: Number;
    gender?: string;
}

export interface IUser  {
    userName: string;
    password: string;
    email: string;
    type?: string;
}