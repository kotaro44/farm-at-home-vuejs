<template>
  <div class="product-list-wrapper">
    <input class="search-input" type="text" placeholder="Search by name..." v-model="search"/>
    <div class="row product-list" v-if="!error">
      <span
        v-if="isLoading"
        v-for="product in placeholders"
        class="column product-placeholder"
        >
        <fah-product-card></fah-product-card>
      </span>
      <span
        v-if="!isLoading"
        v-for="product in filterProducts()"
        v-bind:class="{'have-product-id': !!product.productId}"
        class="column product-wrapper"
        >
        <fah-product-card v-bind:product="product" v-bind:click="openDetail"/>
      </span>
    </div>
    <div v-if="!isLoading && !filterProducts().length" class="error-wrapper">
      <div>No products found!</div>
    </div>
    <div v-if="!isLoading && error" class="error-wrapper">
      <img src="images/e.png" />
      <div>We are so sorry, but there was an error trying to load the products...</div>
    </div>
    <div v-if="!isLoading && products.length === 0" class="error-wrapper">
      <img src="images/e.png" />
      <div>We are so sorry, but seems there are no available products for now.</div>
    </div>
    <div class="modal-wrapper" v-if="productId">
      <div class="modal-content-wrapper">
        <div class="close-btn" v-on:click="closeModal">X</div>
        <div class="modal-content">
          <product-detail v-bind:product-id="productId" v-bind:in-modal="true"></product-detail>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import DataProvider from './data-provider';
  import FahProductCard from './fah-product-card';
  import ProductDetail from './product-detail';

  const ProductList = {
    name: 'product-list',
    data () {
      return {
        search: '',
        isLoading: true,
        error: null,
        productId: null,
        products: [],
        placeholders: (new Array(12)).join('.').split('.')
      }
    },
    components: {
      FahProductCard,
      ProductDetail,
    },
    methods: {
      filterProducts: function filterProducts() {
        return this.products.filter(product => {
          return product.name.match(this.search);
        });
      },

      openDetail: function openDetail(product) {
        this.productId = product.productId;
      },

      closeModal: function closeModal() {
        this.productId = null;
      },
    },
    created: function created() {
      DataProvider.getProducts().then((data) => {
        this.isLoading = false;
        this.products = data;
      }).catch(error => {
        this.isLoading = true;
        this.error = true;
      });
    }
  };

  export default ProductList;
</script>