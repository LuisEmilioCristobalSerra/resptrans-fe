import store from '@/store';

export const can = (permission) => {
    return store.getters.can(permission)
}

export const is = (role) => {
    return store.getters.is(role)
}
