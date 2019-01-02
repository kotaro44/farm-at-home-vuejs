import Vue from 'vue'
import VueRouter from 'vue-router'
import ProductList from './components/product-list'
import FahHeader from './components/fah-header'
import FahFooter from './components/fah-footer'
import ProductDetail from './components/product-detail'

Vue.use(VueRouter);

const routes = [{
    path: '/',
    redirect: '/list'
  },
  {
    path: '/list',
    component: ProductList,
  },
  {
    path: '/list/:id',
    component: ProductDetail,
  },
  {
    path: '*',
    redirect: '/list',
  },
];

const router = new VueRouter({
  routes
});

const app = new Vue({
  router,
  components: {
    FahHeader,
    FahFooter,
    ProductDetail,
  },
}).$mount('#app');
