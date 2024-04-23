export function userGetter() {
    return JSON.parse(window.sessionStorage.getItem("user"));
}
export function tokenGetter(){
    return (window.sessionStorage.getItem("token"));
}