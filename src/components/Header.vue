<template>
  <div class="row m-2">
    <div v-for="element in [{'key': source1, 'value': numBlack}, {'key': source2, 'value': numWhite}]" class="col text-center">
      <img :src="element.key" alt="●" draggable="false"/>
      <span class="h4 align-middle" style="cursor: default">{{ element.value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
  props: ['numBlack', 'numWhite', 'source1', 'source2'],
};
</script>
