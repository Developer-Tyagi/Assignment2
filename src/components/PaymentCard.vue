<template>
  <div class="q-mt-lg">
    <div class="row q-mb-lg card-style">
      <div class="col-2">
        <i
          class="fa fa-credit-card"
          id="brand-icon"
          style="font-size: 22px"
        ></i>
      </div>

      <div id="card-number" class="col-9"></div>
    </div>
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
      if (event.brand) {
        this.setBrandIcon(event.brand);
      }
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
    },

    setBrandIcon(brand) {
      const brandIconElement = document.getElementById('brand-icon');
      let cardBrandToFaClass = {
        visa: 'fa-cc-visa',
        mastercard: 'fa-cc-mastercard',
        amex: 'fa-cc-amex',
        discover: 'fa-cc-discover',
        diners: 'fa-cc-diners-club',
        jcb: 'fa-cc-jcb',
        unknown: 'fa-credit-card'
      };

      let faClass = 'fa-credit-card';
      if (brand in cardBrandToFaClass) {
        faClass = cardBrandToFaClass[brand];
      }
      for (var i = brandIconElement.classList.length - 1; i >= 0; i--) {
        brandIconElement.classList.remove(brandIconElement.classList[i]);
      }
      if (brand == 'unknown') {
        brandIconElement.classList.add('fas');
      } else {
        brandIconElement.classList.add('fab');
      }
      brandIconElement.classList.add(faClass);
    }
  }
};
</script>
<style lang="scss">
#card-expiry-date,
#card-cvc {
  padding: 16px 12px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px 4px 0 0;
}

.card-style {
  padding: 16px 12px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px 4px 0 0;
}

#brand-icon {
  color: rgba(0, 0, 0, 0.57);
}

#card-errors {
  color: red;
  margin-top: 10px;
  padding: 16px 12px;
}
</style>
