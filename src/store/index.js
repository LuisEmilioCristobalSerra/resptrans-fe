import TokenService from '@/services/TokenService'
import { createStore } from 'vuex'

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
    token: null,
    user: null,
    roles: [],
    permissions: [],
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
    setToken(state, token) {
      TokenService.setToken(token)
      state.token = token;
    },
    removeToken(state) {
      TokenService.removeToken()
      state.token = null;
    },
    setUser(state, user) {
      state.user = user;
    },
    setRoles(state, roles) {
      state.roles = roles;
    },
    setPermissions(state, permissions) {
      state.permissions = permissions;
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token);
    },
    removeToken({ commit }) {
      commit('removeToken');
    },
    setUser(context, user) {
      context.commit('setUser', user);
      context.commit('setRoles', user.roles);
      context.commit('setPermissions', user.permissions);
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    can: (state, getters) => (permission) => {
      return state.permissions.some(current => current.name === permission);
    },
    is: (state) => (role) => {
      return state.roles.some(current => current.name === role);
    },
  },
  modules: {},
})
