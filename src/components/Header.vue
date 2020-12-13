<template>
  <div class="row m-2">
    <div class="col text-center h-100">
      <img src="../assets/1.png" alt="●" draggable="false" />
      <span class="h4 align-middle">{{ count1 }}</span>
    </div>
    <div class="col text-center h-100">
      <img src="../assets/2.png" alt="○" draggable="false" />
      <span class="h4 align-middle">{{ count2 }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
  data() {
    return {
      count1: 1,
      count2: 2
    };
  },
  props: ['numBlack', 'numWhite'],
  methods: {},
  watch: {
    numBlack(newVal, oldVal){
      this.count1 = newVal;
    },
    numWhite(newVal, oldVal){
      this.count2 = newVal;
    }
  }
};
</script>