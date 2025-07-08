<template>
    <span class="loader"></span>
</template>
<style scoped>
.loader {
    width: 84px;
    height: 84px;
    position: relative;
}
.loader:before , .loader:after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    width:84px;
    height: 84px;
    border-radius: 50%;
    background:var(--secondary-color-gc);
    animation: push 1s infinite linear alternate;
}
.loader:after {
    background: var(--primary-color-gc);
    animation-direction: alternate-reverse;
}
@keyframes push {
    0% {
        width:14px;
        height: 14px;
    }
    100% {
        width:84px;
        height: 84px;
    }
}
</style>