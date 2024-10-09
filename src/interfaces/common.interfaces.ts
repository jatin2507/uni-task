export interface objectArgs {
    [key: string]: any;
}
export interface JoiError {
    details: { message: string }[];
}

export interface extendedRequest extends Request {
    user: any;
}
