<template>
  <div class="row m-2">
    <div class="col text-center h-100">
      <img :src="source1" alt="●" draggable="false" />
      <span class="h4 align-middle">{{ numBlack }}</span>
    </div>
    <div class="col text-center h-100">
      <img :src="source2" alt="○" draggable="false" />
      <span class="h4 align-middle">{{ numWhite }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
  props: ['numBlack', 'numWhite', 'source1', 'source2'],
};
</script>