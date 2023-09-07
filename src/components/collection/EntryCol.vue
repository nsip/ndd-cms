<template>
    <ColName />
    <br />
    <ColDef />
    <br />
    <ColUrl />
    <br />
    <ColMeta />
    <br />
    <ColEntities />
</template>

<script setup lang="ts">
import ColName from "@/components/collection/1_Name.vue";
import ColDef from "@/components/collection/2_Def.vue";
import ColUrl from "@/components/collection/3_Url.vue";
import ColMeta from "@/components/collection/4_Meta.vue";
import ColEntities from "@/components/collection/5_Entities.vue";
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
