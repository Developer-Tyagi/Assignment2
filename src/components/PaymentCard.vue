<template>
  <div class="q-mt-lg">
    <div id="card"></div>
    <div id="card-errors"></div>
  </div>
</template>
<script>
const stripe = Stripe(process.env.STRIPE_API_KEY);
export default {
  name: 'PaymentCard',

  data() {
    return {
      cardElement: {}
    };
  },

  mounted() {
    const elements = stripe.elements();

    const style = {
      base: {
        color: '#3b3b3b',
        fontSize: '16px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: '#808080'
        }
      },
      invalid: {
        color: 'red',
        iconColor: 'red'
      }
    };

    this.cardElement = elements.create('card', {
      hidePostalCode: true,
      style: style
    });

    const displayErrors = document.getElementById('card-errors', {
      style: style
    });

    this.cardElement.mount('#card');

    this.cardElement.on('change', ({ error }) => {
      if (error) {
        displayErrors.textContent = error.message;
      } else {
        displayErrors.textContent = '';
      }
    });

    this.cardElement.on('change', event => {
      if (event.complete) {
        this.createTokenForPayment(event);
      } else {
        this.$emit('cardDetailsAdded', false);
      }
    });
  },

  methods: {
    clearCard() {
      this.cardElement.clear();
    },

    async createTokenForPayment(event) {
      const token = await stripe.createToken(this.cardElement);
      this.$emit('cardDetailsAdded', token.token.id);
    }
  }
};
</script>
<style lang="scss">
#card {
  padding: 16px 12px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px 4px 0 0;
}

#card-errors {
  color: red;
  margin-top: 10px;
  padding: 16px 12px;
}
</style>
