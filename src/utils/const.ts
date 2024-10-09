import { objectArgs } from "../interfaces/common.interfaces";

const ERRORS: objectArgs = {
    400: "Bad Request - The server could not understand the request due to malformed syntax or invalid parameters. Please check the request and try again.",
    401: "Unauthorized - Authentication is required to access this resource, and the provided credentials have either failed or have not been supplied. Please authenticate and try again.",
    403: "Forbidden - You do not have the necessary permissions to access the requested resource. Please contact your administrator if you believe this is an error.",
    404: "Not Found - The requested resource could not be located on the server. Please verify the URL or resource identifier and try again.",
    500: "Internal Server Error - The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again later or contact support.",
    501: "Not Implemented - The server either does not recognize the request method or lacks the capability to fulfill it. Please check the method and try again.",
    502: "Bad Gateway - The server, while acting as a gateway or proxy, received an invalid response from the upstream server. Please try again later.",
    503: "Service Unavailable - The server is currently unable to handle the request. This could be due to temporary overload or maintenance. Please try again later.",
    504: "Gateway Timeout - The server, acting as a gateway or proxy, did not receive a timely response from the upstream server. Please try again later.",
    505: "HTTP Version Not Supported - The HTTP version used in the request is not supported by the server. Please check the request and try again.",
    506: "Variant Also Negotiates - An internal configuration error occurred on the server, causing a chosen variant resource to engage in an endless content negotiation process. Please contact support.",
    507: "Insufficient Storage - The server is unable to store the representation required to complete the request. Please free up some space or try again later.",
};
//if you want to change name of collection then you can change here
let collection = {
    users: "users",
};

export { ERRORS, collection };
