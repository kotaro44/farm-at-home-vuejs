<template>
  <div class="header-wrapper box-shadow">
    <div class="section">
      <span class="title" v-on:click="goToHomePage">Farm@Home.com</span>
    </div>
    <div class="section">
      <div class="framework-wrapper">
        <img src="./../images/f.png" class="big" />
        <img src="./../images/i.png" class="small" />
      </div>
    </div>
  </div>
</template>

<script>
  const FahHeader = {
    name: 'fah-header',
    methods: {
      goToHomePage: function goToHomePage() {
        window.location.href = '/#/list';
      },
    },
  };

  export default FahHeader;
</script>