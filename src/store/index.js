import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Fields: [
      {
        key: "userName",
        label: "User Name",
        sortable: false,
      },
      {
        key: "gender",
        label: "Gender",
        sortable: false,
      },
      {
        key: "hobby",
        label: "Hobby",
        sortable: false,
      },
      {
        key: "age",
        label: "Age",
        sortable: false,
      },
      {
        key: "date",
        label: "Date",
        sortable: false,
      },
      {
        key: "taskName",
        label: "Task Name",
        sortable: false,
      },
      {
        key: "status",
        label: "Status",
        sortable: false,
      },
      "actions",
    ],
    todolist: [],
    editTodo: {
      userName: "",
      gender: "",
      hobby: [],
      age: 18,
      date: "", //yyyy-mm-dd
      taskName: "",
      status: null,
    }
  },
  getters: {
    todolist: state => state.todolist
  },
  mutations: {
    SET_TODOS(state, todos) {
      state.todolist = todos
    },
    SET_EDIT_TODO(state, editTodo) {
      state.editTodo = editTodo
    },
    ADD_TODO(state, todoData) {
      state.todolist.push(todoData)
    },
    UPDATE_TODO (state, todo) {
      var todos = state.todolist
      todos.forEach((element, index) => {
          if(element.id === todo.id) {
              todos[index] = todo;
          }
      });
      state.todolist = todos;
  },
  CLEAR_TODO(state) {
    state.editTodo = state.editTodo
  },
    DELETE_TODO(state, todoData) {
      var todos = state.todolist
      todos.splice(todos.indexOf(todoData), 1)
    },
  },
  actions: {
    getTodos({
      commit
    }) {
      axios
        .get('http://localhost:3000/todolist')
        .then(r => r.data)
        .then(todos => {
          commit('SET_TODOS', todos)
        })
    },
    getTodoByID({
      commit
    }, todoId) {

      axios
        .get(`http://localhost:3000/todolist/${todoId}`)
        .then(r => r.data)
        .then(todos => {
          commit('SET_EDIT_TODO', todos)
        })
        .catch((error) => {
          console.log(error);
        });

    },
    async addTodo({
      commit
    }, todoData) {
      await axios.post('http://localhost:3000/todolist', todoData).then(() => {
        commit('ADD_TODO', todoData);
      })
    },
    async updateTodoById({
      commit
    }, todoData) {

      await axios.put(`http://localhost:3000/todolist/${todoData.id}`, todoData).then(() => {
        commit('UPDATE_TODO', todoData);
        commit('CLEAR_TODO', todoData);
      })
    },
    deleteTodo({
      commit
    }, todoData) {
      axios.delete(`http://localhost:3000/todolist/${todoData.id}`).then(() => {
        commit('DELETE_TODO', todoData);
      })
    },
  },
  modules: {}
})
