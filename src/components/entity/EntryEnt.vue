<template>
    <EntName />
    <br />
    <EntOtherNames />
    <br />
    <EntDef />
    <br />
    <EntSIF />
    <br />
    <EntOtherStd />
    <br />
    <EntLegalDef />
    <br />
    <EntSensi />
    <br />
    <EntCol />
    <br />
    <EntMeta />
</template>

<script setup lang="ts">
import EntName from "@/components/entity/1_Name.vue";
import EntOtherNames from "@/components/entity/2_OtherNames.vue";
import EntDef from "@/components/entity/3_Def.vue";
import EntSIF from "@/components/entity/4_SIF.vue";
import EntOtherStd from "@/components/entity/5_OtherStd.vue";
import EntLegalDef from "@/components/entity/6_LegalDef.vue";
import EntSensi from "@/components/entity/7_Sensi.vue"
import EntCol from "@/components/entity/8_Col.vue";
import EntMeta from "@/components/entity/9_Meta.vue";
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
