
export function arrayToString(array, searchParam) {
    let string = "";
    if(!searchParam){
        string = array.join(", ");
    } else {
        string  = array.map(element => element[searchParam]).join(", ");
    }
    return string;
}
