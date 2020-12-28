<template>
  <v-row>
    <v-col align-self="center" v-for="element in [{'key': source1, 'value': numBlack, alt: '●'}, {'key': source2, 'value': numWhite, alt: '○'}]" :key="element.key">
      <v-row align="center" justify="center" class="text-h5 font-weight-medium" style="cursor: default">
        <img :src="element.key" :alt="element.alt" draggable="false"/>{{ element.value }}
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "TheHeader",
  props: ['numBlack', 'numWhite', 'source1', 'source2'],
};
</script>

<style scoped>

img {
  height: 44px;
  width: 44px;
}

</style>
