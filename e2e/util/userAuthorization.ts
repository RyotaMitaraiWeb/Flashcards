import { HttpStatus } from "../../src/constants/httpstatus";


export function rejectRequest() {
    return {
        status: HttpStatus.UNAUTHORIZED,
        contentType: 'application/json',
        body: JSON.stringify({}),
    };
}

export function authorizeRequest() {
    return {
        status: HttpStatus.CREATED,
        contentType: 'application/json',
        body: JSON.stringify({
          user: {
            id: 1,
            username: 'ryota1',
          },
          token: 'a',
        }),
    };
}