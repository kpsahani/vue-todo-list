<template>
  <div>
    <b-row>
      <b-alert v-model="showSuccessAlert" variant="success" dismissible>
        {{ alertMessage }}
      </b-alert>
    </b-row>

    <b-row class="mt-3">
        <b-row align-h="between">
          <b-col cols="6">
            <h3>{{ tableHeader }}</h3>
          </b-col>
          <b-col cols="2">
            <b-row>
              <b-col>
                <b-button
                  variant="primary"
                  id="show-btn"
                  @click="showCreateModal"
                >
                  <b-icon-plus class="text-white"></b-icon-plus>
                  <span class="h6 text-white">Create Todo</span>
                </b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-table
            responsive
            hover
            :items="todolist"
            :fields="Fields"
            class="text-center"
          >
            <template #cell(hobby)="data">
                {{ data.item.hobby.toString() }}
            </template>
            <template #cell(status)="data">
              <b-icon-shield-fill-check
                variant="success"
                v-if="data.item.status === 'Active'"
              ></b-icon-shield-fill-check>
              <b-icon-shield-fill-x
                variant="danger"
                v-else
              ></b-icon-shield-fill-x>
            </template>
            <template #cell(actions)="data">
              <b-row>
                <b-col cols="7">
                  <b-icon-pencil-square
                    class="action-item"
                    variant="primary"
                    @click="getRowData(data.item.id)"
                  ></b-icon-pencil-square>
                </b-col>
                <b-col cols="1">
                  <b-icon-trash-fill
                    class="action-item"
                    variant="danger"
                    @click="showDeleteModal(data.item)"
                  ></b-icon-trash-fill>
                </b-col>
              </b-row>
            </template>
          </b-table>
        </b-row>
    </b-row>

    <!-- Modal for new create todo -->
    <b-modal
      ref="createTodoModal"
      size="xl"
      hide-footer
      title="Create Todo"
    >
      <CreateTodo
        @closeCreateModal="closeCreateModal"
        @reloadDataTable="getTodoList"
        @showSuccessAlert="showAlertCreate"
      ></CreateTodo>
    </b-modal>

    <!-- Modal for update todo -->
    <b-modal
      ref="editTodoModal"
      size="xl"
      hide-footer
      title="Edit Todo"
    >
      <EditTodo
        @closeEditModal="closeEditModal"
        @reloadDataTable="getTodoList"
        @showSuccessAlert="showAlertUpdate"
        :todoId="todoId"
      ></EditTodo>
    </b-modal>

    <!-- Modal for delete todo -->
    <b-modal
      ref="deleteTodoModal"
      size="md"
      hide-footer
      title="Confirm Deletion"
    >
      <DeleteTodo
        @closeDeleteModal="closeDeleteModal"
        @reloadDataTable="getTodoList"
        @showDeleteAlert="showDeleteSuccessModal"
        :todoData="todoData"
      ></DeleteTodo>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import CreateTodo from "@/components/CreateTodo.vue";
import EditTodo from "@/components/EditTodo.vue";
import DeleteTodo from "@/components/DeleteTodo.vue";

export default {
  components: {
    CreateTodo,
    EditTodo,
    DeleteTodo
  },
  data() {
    return {
      items: [],
      todoId: 0,
      todoData : {},
      tableHeader: "TodoList",
      showSuccessAlert: false,
      alertMessage: "",
    };
  },
  computed: {
      ...mapGetters(["todolist"]),
      ...mapState(["Fields"])
  },
  created () {
     this.getTodoList()
  },
  methods: {
    showCreateModal() {
      this.$refs["createTodoModal"].show();
    },
    closeCreateModal() {
      this.$refs["createTodoModal"].hide();
    },
    getTodoList() {
       this.$store.dispatch('getTodos');
    },
    getRowData(id) {
      this.$refs["editTodoModal"].show();
      this.todoId = id;
    },
    closeEditModal() {
      this.$refs["editTodoModal"].hide();
    },
    showAlertCreate() {
      this.showSuccessAlert = true;
      this.alertMessage = "TodoList created successfully!";
    },
    showAlertUpdate() {
      this.showSuccessAlert = true;
      this.alertMessage = "TodoList updated successfully!";
    },
    showDeleteModal(todoData) {
      this.$refs["deleteTodoModal"].show();
      this.todoData = todoData;
    },
    closeDeleteModal() {
      this.$refs["deleteTodoModal"].hide();
    },
    showDeleteSuccessModal() {
      this.showSuccessAlert = true;
      this.alertMessage = "TodoList deleted successfully!";
    },
  }

};
</script>

<style  scoped>
.action-item:hover {
  cursor: pointer;
}
button.close {
    background-color: orange;
    border-radius: 18px;
    padding: 1px 10px;
    font-size: 20px;
    margin: 10px;
}
</style>