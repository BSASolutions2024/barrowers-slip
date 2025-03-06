import { NextResponse } from "next/server";

export class APIError extends Error {
    status: number;
    constructor(message: string, status = 500) {
        super(message);
        this.status = status;
    }
}

export default function APIErrorHandler(error: unknown) {
    console.log("API Error", error)

    let errorMessage = "Something went wrong"
    let statusCode = 500 //Default

    if (error instanceof APIError) {
        
        errorMessage = error.message
        statusCode = error.status
    }
    else if (error instanceof Error) {
        errorMessage = error.message
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode })
}