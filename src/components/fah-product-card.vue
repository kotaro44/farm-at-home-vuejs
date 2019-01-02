<template>
  <div class="fah-product-wrapper">
    <div class="box-shadow product-content" v-if="product" v-on:click="click(product)">
      <div class="product-name">
        {{(product.name || '???')}}
      </div>
      <div class="product-image">
        <span>
          <img v-if="product.image" v-bind:src="product.image" />
          <img v-if="!product.image" src="images/u.png" />
        </span>
        <span class="product-price">
          {{Constants.currency + (parseFloat(product.price).toFixed(2) || '??')}}
        </span>
      </div>
    </div>
    <div class="box-shadow product-content" v-if="!product">
      <div class="product-name">
        <img src="./../images/a.gif" />
      </div>
      <div class="product-image product-placeholder">
        <img src="./../images/p.gif" />
      </div>
    </div>
  </div>
</template>

<script>
  import Constants from './constants';

  const FahProductCard = {
    name: 'fah-product-card',
    data: function data() {
      return {
        Constants: Constants,
      };
    },
    props: {
      product: {
        type: Object,
        default: null,
      },
      click: {
        type: Function,
        default: null,
      },
    }
  };

  export default FahProductCard;
</script>