import BackendService from "@/services/BackendService"

const url = "/subsidiaries"

const all = async () => {
    return BackendService.get(url)
}

const create = async (params) => {
    return BackendService.post(url, params)
}

const find = async (id) => {
    return BackendService.get(`${url}/${id}`)
}

const update = async (id, params) => {
    return BackendService.put(`${url}/${id}`, params)
}

const deleteModel = async (id) => {
    return BackendService.delete(`${url}/${id}`)
}

export default { all, create, find, update, deleteModel }
