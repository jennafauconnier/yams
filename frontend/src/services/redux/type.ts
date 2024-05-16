export interface LoginResponse {
    meta: {
        arg: {
            email: string
            paswword: string
        },
        requestId: string
        requestStatus: string
    },
    payload: {
        tokenId: string
        user: {
            date: string
            email: string
            gamesPlayed: number
            password: string
            pastriesWon : string[]
            _id: string
        },
        type: string
    }
    token: string;
}


export interface LoginError {
    message: string;
}