
<template>
    <div class="container">
        <div>
            <v-img :src="Empty" alt="Sin datos" height="210" width="280"></v-img>
            <p> No se ha podido encontrar resultados </p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Empty from '~/assets/images/empty.png';
</script>

<style scoped lang="scss">
.container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
</style>