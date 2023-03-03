import BackendService from "@/services/BackendService"

const url = "/transfers"

const all = async (params) => {
    return BackendService.get(url, { params })
}

const create = async (params) => {
    return BackendService.post(url, params)
}

export default { all, create }
