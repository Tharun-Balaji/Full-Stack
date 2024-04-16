

export async function signUp(request,response){
    try {
        const { fullName, username, password, confirmPassword, gender } = request.body;
    } catch (error) {
        
    }
}

export function login(request,response) {
    console.log("login User");
}

export function logout(request,response) {
    console.log("logout User");
}