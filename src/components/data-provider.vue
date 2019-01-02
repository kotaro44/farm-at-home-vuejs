<script>
  import axios from 'axios';

  const host = window.location.origin.replace(/:\d+/, '') + ':3000/';
  const DataProvider = {
    getProducts: function getProducts() {
      return new Promise(function promise(resolve, reject) {
        axios.get(host + 'list').then(data => {
          resolve(parseData(data.data.products));
        }).catch(reject)
      });
    },
    getProduct: function getProduct(productId) {
      return new Promise(function promise(resolve, reject) {
        axios.get(host + 'product/' + productId).then(data => {
          resolve(parseData(data.data));
        }).catch(reject)
      });
    },
  };

  function parseData(data) {
    if (Array.isArray(data)) {
      data.forEach(item => {
        item.image = host + 'icons/' + item.productId;
      });
    }
    else {
      data.image = host + 'images/' + data.productId;
    }

    return data;
  };

  export default DataProvider;
</script>