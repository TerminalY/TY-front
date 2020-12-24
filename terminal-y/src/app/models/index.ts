export interface ICloth {
    name?: string;
    type?: string;
    size?: string;
    price?: Number;
    color?: string;
    amount?: Number;
    gender?: string;
    img?: string;
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