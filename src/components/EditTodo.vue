<template>
  <validation-observer ref="observer" v-slot="{ handleSubmit }">
    <b-form @submit.stop.prevent="handleSubmit(updateTodoById)" class="mt-3">
      <b-row class="mt-4">
        <b-col cols="6">
          <validation-provider
            name="User Name"
            :rules="{ required: true, min: 3, max: 15, alpha_spaces: true }"
            v-slot="validationContext"
          >
            <b-form-group id="userName" label="User Name" label-for="userName">
              <b-form-input
                id="userName"
                type="text"
                placeholder="User Name"
                v-model.trim="editTodo.userName"
                :state="getValidationState(validationContext)"
                class="mt-1"
              ></b-form-input>
              <b-form-invalid-feedback id="input-1-live-feedback">{{
                validationContext.errors[0]
              }}</b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col cols="6">
          <b-form-group id="gender" label="Gender" v-slot="{ ariaDescribedby }">
            <b-form-radio
              v-model="editTodo.gender"
              :aria-describedby="ariaDescribedby"
              name="gender"
              value="Male"
              >Male</b-form-radio
            >
            <b-form-radio
              v-model="editTodo.gender"
              :aria-describedby="ariaDescribedby"
              name="gender"
              value="Female"
              >Female</b-form-radio
            >
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="mt-4">
        <b-col cols="6">
          <b-form-group label="Hobby" v-slot="{ ariaDescribedby }">
            <b-form-checkbox-group
              id="hobby"
              v-model="editTodo.hobby"
              :aria-describedby="ariaDescribedby"
              name="hobby"
            >
              <b-form-checkbox value="Sports">Sports</b-form-checkbox>
              <b-form-checkbox value="Reading">Reading</b-form-checkbox>
              <b-form-checkbox value="Music">Music</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group id="age" label="Age (18 to 55)">
            <b-form-input
              id="age"
              v-model="editTodo.age"
              type="range"
              min="18"
              max="55"
              v-bind:style="{width:'100%'}"
            ></b-form-input>
          </b-form-group>
          Age : {{ editTodo.age }}
        </b-col>
      </b-row>

      <b-row class="mt-4">
        <b-col cols="6">
          <b-form-group label="Date">
            <b-form-datepicker
              v-model="editTodo.date"
              @context="onContext"
              id="date"
              placeholder="Choose a date"
              locale="en"
            ></b-form-datepicker>
          </b-form-group>
        </b-col>
        <b-col cols="6">
            <validation-provider
            name="Task Name"
            :rules="{ required: true }" 
            v-slot="validationContext"
          >
          <b-form-group id="taskName" label="Task Name" label-for="taskName">
            <b-form-input
              id="taskName"
              type="text"
              placeholder="Task Name"
              v-model="editTodo.taskName"
              :state="getValidationState(validationContext)"
              name="Task Name"
              class="mt-1"
            ></b-form-input>
            <b-form-invalid-feedback id="input-1-live-feedback">{{
                validationContext.errors[0]
              }}</b-form-invalid-feedback>
          </b-form-group>
                    </validation-provider>
        </b-col>
      </b-row>

      <b-row class="mt-4">
        <b-col cols="6">
          <b-form-group label="Status">
            <b-form-select
              v-model="editTodo.status"
              :options="options"
              class="custom-select"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col cols="6">
          <b-button variant="primary" class="px-5 addBtn" @click="updateTodoById"
            >Update Todo</b-button
          >

          <b-button variant="warning" @click="triggerCancel">Cancel</b-button>
        </b-col>
      </b-row>
    </b-form>
  </validation-observer>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "EditTodo",
  props: {
    todoId: String,
  },
  data() {
    return {
      options: [
        { value: null, text: 'Please select status' },
        { value: "Active", text: "Active" },
        { value: "Inactive", text: "Inactive" },
      ]
    };
  },
  computed: {
    ...mapState(["editTodo"]),
  },
  mounted() {
    this.getTodoById();
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    onContext(ctx) {
      // The date formatted in the locale, or the `label-no-date-selected` string
      // this.formatted = ctx.selectedFormatted
      // The following will be an empty string until a valid date is entered
      this.editTodo.date = ctx.selectedYMD;
    },
    triggerCancel() {
      this.$emit("closeEditModal");
    },
    getTodoById() {
      this.$store.dispatch("getTodoByID", this.todoId);
    },
    updateTodoById() {
      this.$store
        .dispatch("updateTodoById", this.editTodo)
        .then(() => {
          this.resetForm();
          this.$emit("closeEditModal");
          this.$emit("reloadDataTable");
          this.$emit("showSuccessAlert");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    resetForm() {

      this.$nextTick(() => {
        this.$refs.observer.reset();
      });
      return
    }
  },
  
};
</script>
<style scoped>
.addBtn {
    margin-right: 10px;
}

.action-item:hover {
  cursor: pointer;
}
div#hobby {
    display: inline-flex;
    
}
div#hobby .custom-checkbox{
        margin-right: 10px;
    }
fieldset#gender .custom-radio {
    display: inline-block;
    margin-right: 10px;
}
.custom-select{
    transition: background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.custom-select {
    display: inline-block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 1.75rem 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    vertical-align: middle;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;

}
</style>