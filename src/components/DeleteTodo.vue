<template>
  <div>
    <b-row class="mt-2 mb-3">
      <h6 class="text-secondary">
        Are you sure you want to delete?
      </h6>
    </b-row>
    <b-row class="mt-2 ">
        <b-button variant="danger" @click="deleteTodo"
          >Delete</b-button
        >
    </b-row>
    <b-row class="mt-2">
        <b-button variant="warning" @click="triggerCancel">Cancel</b-button>
    </b-row>
  </div>
</template>

<script>

export default {
  name: "DeleteTodo",
  props: {
    todoData: Object,
  },
  methods: {
    triggerCancel() {
      this.$emit("closeDeleteModal");
    },
    deleteTodo() {

         this.$store.dispatch('deleteTodo', this.todoData).then(()=>{
                this.$emit("reloadDataTable");
                this.$emit("showDeleteAlert");
                this.$emit("closeDeleteModal");
         }).catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>