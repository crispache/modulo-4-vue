
<template>
    <div class="container">
        <div>
            <v-img :src="Empty" alt="Sin datos" height="210" width="280"></v-img>
            <p> No se han encontrado resultados  </p>
            <p> Pruebe con otro nombre </p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Empty from '~/assets/images/empty.png';
</script>

<style scoped lang="scss">
.container {
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
</style>