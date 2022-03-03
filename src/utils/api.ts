import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

async function post(path:string, data:object) {
    return await axios.post(URL + path, data=data)
        .then(res => {
            console.log(res);
            return res.data;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

async function get(path:string) {
    await axios.get(URL + path)
        .then(res => {
            console.log(res);
            return res.data;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}


export async function signup(userId:string, userName:string, userPassword:string): Promise<boolean> {
    // TODO: 
    // - ID被りのレスポンス
    // - レスポンスのフォーマット
    const data = {
        "userId": userId,
        "userName": userName,
        "userPassword": userPassword
    }

    console.log(data);
    
    return await post("/user/signup", data)
        .then(res => {
            return res.result;
        })
        .catch(err => {
            throw err;
        });
}

export async function login(userId:string, userPassword:string): Promise<boolean> {
    const data = {
        userId: userId,
        userPassword: userPassword,
    }
    
    return await post("/user/login", data)
        .then(res => {
            return res.result;
        })
        .catch(err => {
            throw err;
        });
}

export function meetingCreate(meetingName:string, startTime:string, presenters:string[]){
    // TODO: 
    // - startTimeのフォーマット
    const data = {
        meetingName: meetingName,
        startTime: startTime,
        presenters: presenters,
    }

    const response = post("/meeting/create", data);
    return response;
}

export function meetingJoin(userId:string, meetingId:number, choko:boolean=false){
    // TODO:
    // - startTimeのフォーマット
    // - return のフォーマット
    const data = {
        userId: userId,
        meetingId: meetingId,
        // choko: choko,
    }

    const response = post("/meeting/join", data);
    return response;
}

export function postDocument(userId:string, meetingId:string, file:string="", script:string=""){
    // TODO:
    // - fileの扱い(ファイルのパスを受け取って，ここでBase64エンコードするか)
    const data = {
        userId: userId,
        meetingId: meetingId,
        file: file,
        script: script,
    }

    const response = post("/document", data);
    return response;
}

export function getDocument(documentId:string){
    const response = get("/document/?id=" + documentId);
    return response;
}