<template>
  <div class="row product-detail" v-bind:class="{'in-modal': inModal}">
    <div class="detail-content-wrapper">
      <div class="detail-content">
        <div class="detail-name-wrapper">
          <span v-if="!isLoading">
            <span v-if="!error">
              <div class="product-detail-name-wrapper">
                <div class="product-detail-name">{{product.name || '???'}}</div>
                <div class="sharable-link" v-on:click="copy2clipboard" v-bind:class="{'shared': copied}"></div>
              </div>
            </span>
            <span v-if="error">Error</span>
          </span>
          <img v-if="isLoading && inModal" src="./../images/a2.gif">
          <img v-if="isLoading && !inModal" src="./../images/a.gif">
        </div>
        <div class="detail-description-wrapper">
          <span v-if="!isLoading">
            <span v-if="!error">
              <div class="detail-description">{{product.description || 'No Description'}}</div>
              <div class="nutrition-facts-wrapper">
                <div class="detail-name-wrapper">
                  Nutrition Facts
                </div>
                <div class="nutrition-fact" v-for="nutritionFact in product.nutritionFacts">
                  <span class="nutrition-fact-name">{{nutritionFact.name}}</span>
                  <span>
                    <span v-if="nutritionFact.value.value || nutritionFact.value.value === 0">
                      <span>{{nutritionFact.value.value}}{{nutritionFact.value.unit}}</span>
                      <span class="nutrition-fact-per">{{nutritionFact.value.per}}</span>
                    </span>
                    <span class="nutrition-fact-per" v-if="!nutritionFact.value.value && nutritionFact.value.value !== 0">
                      {{nutritionFact.value}}
                    </span>
                  </span>
                </div>
              </div>
            </span>
            <span v-if="error">We are sorry, but we were not able to get data back from the server...</span>
          </span>
          <img v-if="isLoading && inModal" src="./../images/a2.gif">
          <img v-if="isLoading && !inModal" src="./../images/a.gif">
        </div>
        <div class="detail-price-wrapper">
          <span v-if="!isLoading && !error">
            {{Constants.currency + (parseFloat(product.price).toFixed(2) || '??')}}
          </span>
          <img v-if="isLoading && inModal" src="./../images/a2.gif">
          <img v-if="isLoading && !inModal" src="./../images/a.gif">
        </div>
      </div>
    </div>
    <div class="detail-image-wrapper">
      <span v-if="!isLoading">
        <span v-if="!error">
          <img v-if="product.image" v-bind:src="product.image" />
          <img v-if="!product.image" src="./../images/u.png" />
        </span>
        <img v-if="error" src="./../images/e.png" />
      </span>
      <img v-if="isLoading" class="detail-img-placeholer" src="./../images/p.gif">
    </div>
  </div>
</template>

<script>
  import DataProvider from './data-provider';
  import Constants from './constants';

  const ProductDetail = {
    name: 'product-detail',
    props: {
      inModal: {
        type: Boolean,
        default: false,
      },
      productId: {
        type: Number,
        default: 0,
      },
    },
    data () {
      return {
        Constants: Constants,
        copied: false,
        isLoading: true,
        error: null,
        product: null,
        loaderSrc: './../images/a.gif',
      }
    },
    methods: {
      copy2clipboard: function copy2clipboard() {
        var temp = document.createElement('textarea');

        temp.value = window.location.origin + '/#/list/' + (this.productId || this.$route.params.id);
        temp.setAttribute('readonly', '');
        temp.style.position = 'absolute';
        temp.style.left = '-9999px';
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        this.copied = true;
      },
    },
    created: function created() {
      DataProvider.getProduct(this.productId || this.$route.params.id).then(data => {
        this.product = data;
        this.isLoading = false;
      }).catch(error => {
        this.isLoading = false;
        this.error = true;
      })
    },
  };

  export default ProductDetail;
</script>