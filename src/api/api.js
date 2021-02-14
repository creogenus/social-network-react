import * as axios from "axios";

export const instance = axios.create({
    withCredentials:true,
    baseURL:'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "ef350660-ea14-4a08-b19a-8b0ecef72bfe"
    }
})

export const usersAPI = {
    getUsers (currentPage, pageSize){
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
    followAPI(userID){
        return instance.post(`follow/${userID}`,{}).then(response => response.data);
    },
    unfollowAPI (userID){
        return instance.delete(`follow/${userID}`).then(response => response.data);
    }
}

export const profileAPI = {

    setUserProfile(userID) {
       return  instance.get(`profile/`+userID);
    },
    getUsersStatus(userID){
        return instance.get('profile/status/'+userID);
    },
    postUsersStatus(status){
        return instance.put('profile/status', {status: status});
    },
    savePhoto(file){
        let formData = new FormData();
        formData.append('image',file )
        return instance.put('profile/photo', formData, {
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
    },
    saveProfile(profileData){
        return instance.put('profile',profileData)
    }

}

export  const authAPI = {
    setAuthorizedProfile(){
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false, captcha = null){
        return instance.post('auth/login',{email,password,rememberMe,captcha})
    },
    logout(){
        return instance.delete('auth/login')
    }
}

export const  securityAPI = {
    getCaptchaURL(){
        return instance.get('security/get-captcha-url')
    }
}