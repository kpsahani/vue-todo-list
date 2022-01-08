<template>
    <b-row>
      <TodoList></TodoList>
    </b-row>
</template>

<script>
import TodoList from "@/components/TodoList.vue";

export default {
  name: "Home",
  components: {
    TodoList,
  },
};
</script>