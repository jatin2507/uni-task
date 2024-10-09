import { ERRORS } from "./const";

interface Response {
    error: boolean;
    message: string;
    data: any;
    code: number;
    notificationFlag: boolean;
}

export const success = (
    data: any = {},
    message: string = "",
    code: number = 200,
    notificationFlag: boolean = false
): Response => {
    return {
        error: false,
        message: message || "Success",
        data,
        code,
        notificationFlag,
    };
};

export const failed = (
    data: any = {},
    message: string = "",
    code: number = 400,
    notificationFlag: boolean = false
): Response => {
    return {
        error: true,
        message: message || ERRORS[code],
        data,
        code,
        notificationFlag,
    };
};

export const validation = (
    message: string = "Bad Request",
    data: any = {},
    notificationFlag: boolean = false
): Response => {
    return {
        error: true,
        message,
        code: 400,
        data,
        notificationFlag,
    };
};
