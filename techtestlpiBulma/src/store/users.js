import axios from 'axios'

const getters = {
    usersList: state => state.users
}
const state = {
    users: [],
}

const mutations = {
    setUsers: (state, users) => (
        state.users = users
    ),
    removeUser: (state, id) => {
        const userIndex = state.users.findIndex(u => u.id === id)
        state.users.splice(userIndex, 1)
    },
    updateUser: (state, user) => {
        const userIndex = state.users.findIndex(u => u.id === user.id)
        state.users.splice(userIndex, 1, user)
        console.log(userIndex)
    },
    addUser: (state, user) => {
        const newId = state.users.reduce((acc, u) => acc = acc > u.id ? acc : u.id, 0) + 1
        state.users.push({ ...user, id: newId })
    }


}
const actions = {
    getUsers: ({ commit }) => {
        axios({
            method: "get",
            url: "https://fakerapi.it/api/v1/persons?_locale=fr_FR",
        })
            .then((res) => {
                commit('setUsers', res.data.data)
            })
            .catch((err) => {
                console.log(err);
            });
    },
    deleteUser: ({ commit }, id) => {
        commit("removeUser", id)
    },
    editUser: ({ commit }, user) => {
        console.log(user)
        commit("updateUser", user)
    },
    createUser: ({ commit }, user) => {
        commit("addUser", user)
    }
}

export default {
    state, getters, actions, mutations
}