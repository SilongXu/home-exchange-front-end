<template>
  <div id="app">
    <h1>Bitcoin Price Index</h1>

    <section v-if="errored">
      <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
    </section>

    <section v-else>
      <div v-if="loading">Loading...</div>

      <div
        v-else
        v-for="currency in info"
        :key="currency.code"
        class="currency"
      >
        {{ currency.description }}:
        <span class="lighten">
          <span v-html="currency.symbol"></span>{{ currency.rate_float | currencydecimal }}
        </span>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'bitcoin',
  data () {
    return {
      info: null,
      loading: true,
      errored: false
    }
  },
  filters: {
    currencydecimal (value) {
      return value.toFixed(2)
    }
  },
  mounted () {
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => {
        this.info = response.data.bpi
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  }
}
</script>

<style scoped>
#app {
  margin-top: 20px;
  width: 320px;
  padding: 1px 40px 40px 40px;
  background: #2F242C;
  border-radius: 5px;
  color: #B3BFB8;
  font-family: 'Roboto Slab', serif;
  line-height: 1.4;
}

h1 {
  color: #F0F7F4;
  margin: 0.67em 0;
}

.currency {
  text-align: left;
}

.lighten {
  color: white;
}
</style>