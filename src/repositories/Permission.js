import BackendService from "@/services/BackendService"

const url = "/permissions"

const all = async (params) => {
    return BackendService.get(url, { params })
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

const subsidiaries = async (id, params) => {
    return BackendService.get(`${url}/${id}/subsidiaries`, { params })
}

const createResponsive = async (id, params) => {
    return BackendService.post(`${url}/${id}/responsives`, params)
}

const roles = async (params) => {
    return BackendService.get('roles', { params })
}

export default { all, create, find, update, deleteModel, subsidiaries, createResponsive, roles }
