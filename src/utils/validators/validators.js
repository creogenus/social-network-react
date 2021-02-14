export const requiredFields = (value) => {

    if (value) return undefined
    else
        return 'Field is required!';
}
export const maxLength300 = (value) =>{
    if(value.length <=300)return undefined
    else
        return 'Max Length 300!';
}