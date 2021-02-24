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
  'pk_test_51IJWePEK8DUf1aFSQMUUHOdf4eFYmSgUaXxDdu31oqO5gDNcjTw6NF8ECGgWhyUXqZRk4xTWIVTgm72LfKx0eNYM00ntmzs1ns'
);
export default {
  name: 'PaymentCard',

  data() {
    return {};
  },

  mounted() {
    const elements = stripe.elements();
    let cardNumberEvent = false;
    let cardExpiryDateEvent = false;
    let cardCvcEvent = false;
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

    cardNumberElement.on('change', event => {
      cardNumberEvent = event.complete;
      if (cardCvcEvent && cardExpiryDateEvent && cardNumberEvent) {
        this.createTokenForPayment(event, cardCvcElement);
      } else {
        this.$emit('cardDetailsAdded', false);
      }
    });

    cardExpiryDateElement.on('change', event => {
      cardExpiryDateEvent = event.complete;
      if (cardCvcEvent && cardExpiryDateEvent && cardNumberEvent) {
        this.createTokenForPayment(event, cardCvcElement);
      } else {
        this.$emit('cardDetailsAdded', false);
      }
    });

    cardCvcElement.on('change', event => {
      cardCvcEvent = event.complete;
      if (cardCvcEvent && cardExpiryDateEvent && cardNumberEvent) {
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

#card-errors {
  color: red;
  margin-top: 10px;
  padding: 16px 12px;
}
</style>
