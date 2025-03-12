import { NextResponse } from "next/server";

export async function POST(req) {
    const { auth, email, password } = req.body;

    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        return NextResponse.json(
            { message: "Account Created successfullly", userCredential },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Some Error occurred", details: error.message },
            { status: 500 }
        );
    }
}