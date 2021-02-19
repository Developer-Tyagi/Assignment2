<template>
  <div class="">
    <label class="heading">Card Number</label>
    <div id="card-number"></div>
    <label class="heading">Expiry Date</label>
    <div id="card-expiry-date"></div>
    <label class="heading">CVV</label>
    <div id="card-cvv"></div>
    <div></div>
    <div id="payment-errors"></div>
  </div>
</template>
<script>
const stripe = Stripe(
  'pk_test_51ILZR8AGR7x56iDlbZcd3BMWhLRYPacnJVMI8ha2IaZmbKk9UQfNQhqTFMymy086XAJ1E0zrO9IykTXV8ry8DQOk00ZUXCDne4'
);
export default {
  name: 'PaymentCard',

  data() {
    return {};
  },

  mounted() {
    const elements = stripe.elements();
    const style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        padding: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: 'red',
        iconColor: 'red'
      }
    };
    const cardNumberElement = elements.create('cardNumber', {
      style: style
    });

    const displayError = document.getElementById('payment-errors', {});

    cardNumberElement.mount('#card-number');

    cardNumberElement.on('change', event => {
      if (event.complete) {
        this.createTokenForPayment(event, cardElement);
      } else {
        this.$emit('cardDetailsAdded', false);
      }
    });

    cardNumberElement.on('change', ({ error }) => {
      const displayError = document.getElementById('payment-errors');
      if (error) {
        displayError.textContent = error.message;
      } else {
        displayError.textContent = '';
      }
    });
  },

  methods: {
    async createTokenForPayment(event, cardElement) {
      const token = await stripe.createToken(cardElement);
      this.$emit('cardDetailsAdded', true);
    }
  }
};
</script>
<style lang="scss">
.heading {
}

#card-number,
#card-expiry-date,
#card-cvv {
  padding: 12px 12px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px 4px 0 0;
}
</style>
