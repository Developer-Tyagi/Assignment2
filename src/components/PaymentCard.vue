<template>
  <div class="q-mt-lg">
    <div id="card-number" class="q-mb-lg"></div>

    <div class="row justify-between">
      <div id="card-expiry-date" class="col-6"></div>
      <div id="card-cvc" class="col-5"></div>
    </div>

    <div id="card-errors"></div>
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
        color: '#3b3b3b',
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

    const cardNumberElement = elements.create('cardNumber', {
      style: style
    });
    const cardExpiryDateElement = elements.create('cardExpiry', {
      style: style
    });
    const cardCvcElement = elements.create('cardCvc', {
      style: style
    });

    const displayErrors = document.getElementById('card-errors', {
      style: style
    });

    cardNumberElement.mount('#card-number');

    cardExpiryDateElement.mount('#card-expiry-date');

    cardCvcElement.mount('#card-cvc');

    cardNumberElement.on('change', ({ error }) => {
      if (error) {
        displayErrors.textContent = error.message;
      } else {
        displayErrors.textContent = '';
      }
    });

    cardExpiryDateElement.on('change', ({ error }) => {
      if (error) {
        displayErrors.textContent = error.message;
      } else {
        displayErrors.textContent = '';
      }
    });

    cardCvcElement.on('change', ({ error }) => {
      if (error) {
        displayErrors.textContent = error.message;
      } else {
        displayErrors.textContent = '';
      }
    });

    // cardNumberElement.on('change', event => {
    //   if (event.complete) {
    //     this.createTokenForPayment(event, cardNumberElement);
    //   } else {
    //     this.$emit('cardDetailsAdded', false);
    //   }
    // });

    // cardExpiryDateElement.on('change', event => {
    //   if (event.complete) {
    //     this.createTokenForPayment(event, cardExpiryDateElement);
    //   } else {
    //     this.$emit('cardDetailsAdded', false);
    //   }
    // });

    cardCvcElement.on('change', event => {
      if (event.complete) {
        this.createTokenForPayment(event, cardCvcElement);
      } else {
        this.$emit('cardDetailsAdded', false);
      }
    });
  },

  methods: {
    async createTokenForPayment(event, element) {
      const token = await stripe.createToken(element);
      this.$emit('cardDetailsAdded', token.token.id);
    }
  }
};
</script>
<style lang="scss">
#card-number,
#card-expiry-date,
#card-cvc {
  padding: 16px 12px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px 4px 0 0;
}
</style>
