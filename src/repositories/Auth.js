import BackendService from "@/services/BackendService"

const url = "/auth"

const login = async (params) => {
    return BackendService.post(`${url}/login`, params)
}

const me = async () => {
    return BackendService.post(`${url}/me`)
}

export default { login, me }
