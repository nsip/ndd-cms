<template>
    <div>
        <span class="title"> {{ title }} </span>
        <span class="user"> {{ loginUser }} </span>
        <hr class="sep" />
    </div>
</template>

<script setup lang="ts">

import { Mode, itemCat, loginUser } from "@/share/share";

// console.log("[PageTitle.vue] mode:", Mode.value)
// console.log("[PageTitle.vue] item category:", itemCat.value)

const cat = itemCat.value == "entity" ? "Entity" : "Collection";
const title = Mode.value == "edit" ? `${cat} Edit` : `New ${cat}`;

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
    float: center;
    text-align: center;
    font-size: 160%;
    font-weight: bold;
    margin-left: 0.5%;
}

.user {
    float: right;
    margin-top: 0.4%;
    margin-right: 1%;
}

.sep {
    margin-top: 0.5%;
    margin-bottom: 1%;
}
</style>
