<template>
    <div class="alert--message alert alert-danger" role="alert">
        <strong>
            <slot/>
        </strong>
        <button class="close" type="button" @click="$emit('closeMessage')">
            <span>&times;</span>
        </button>
    </div>
</template>

<script>
export default {
    name: "AlertMessage"
};
</script>

<style>
</style>
