<template>
  <div class="">
    <div id="card-element"></div>
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

  props: {
    isDropBoxEnable: {
      type: Boolean,
      required: false
    }
  },

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
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: 'green',
        iconColor: 'green'
      }
    };
    const cardElement = elements.create('cardNumber', {
      style: style,
      hidePostalCode: true
    });
    const displayError = document.getElementById('payment-errors');

    cardElement.mount('#card-element');

    cardElement.on('change', event => {
      if (event.complete) {
        this.createTokenForPayment(event, cardElement);
      } else {
        this.$emit('cardDetailsAdded', false);
      }
    });

    cardElement.on('change', ({ error }) => {
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
      console.log(token, 'token');
      this.$emit('cardDetailsAdded', true);
    }
  }
};
</script>
<style lang="scss"></style>
