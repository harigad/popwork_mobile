import {Component, OnInit} from '@angular/core';
declare var Stripe: any;
import { NavController } from '@ionic/angular';


/**
 * Generated class for the StripePaymentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'stripe-payment',
  templateUrl: 'stripe-payment.html'
})
export class StripePaymentComponent implements OnInit {


  text: string;

  constructor(public navCtrl: NavController, ) {
  }

  ngOnInit() {
    const stripe = Stripe('pk_test_EQJ9zX1m5j0JkJCrIhk6FwMJ');
    // let nav = this.navCtrl;

    function registerElements(elems, exampleName) {
      const formClass = '.' + exampleName;
      const example = document.querySelector(formClass);

      const form = example.querySelector('form');
      const resetButton = example.querySelector('a.reset') as HTMLElement;
      const error = form.querySelector('.error')  as HTMLElement;
      const errorMessage = error.querySelector('.message') as HTMLElement;

      function enableInputs() {
        Array.prototype.forEach.call(
            form.querySelectorAll(
                'input[type="text"], input[type="email"], input[type="tel"]'
            ),
            function(input) {
              input.removeAttribute('disabled');
            }
        );
      }

      function disableInputs() {
        Array.prototype.forEach.call(
            form.querySelectorAll(
                'input[type="text"], input[type="email"], input[type="tel"]'
            ),
            function(input) {
              input.setAttribute('disabled', 'true');
            }
        );
      }

      function triggerBrowserValidation() {
        // The only way to trigger HTML5 form validation UI is to fake a user submit
        // event.
        const submit = document.createElement('input');
        submit.type = 'submit';
        submit.style.display = 'none';
        form.appendChild(submit);
        submit.click();
        submit.remove();
      }

      // Listen for errors from each Element, and show error messages in the UI.
      const savedErrors = {};
      elems.forEach(function(element, idx) {
        element.on('change', function(event) {
          if (event.error) {
            error.classList.add('visible');
            savedErrors[idx] = event.error.message;
            errorMessage.innerText = event.error.message;
          } else {
            savedErrors[idx] = null;
            // Loop over the saved errors and find the first one, if any.
            const nextError = Object.keys(savedErrors)
                .sort()
                .reduce(function(maybeFoundError, key) {
                  return maybeFoundError || savedErrors[key];
                }, null);

            if (nextError) {
              // Now that they've fixed the current error, show another one.
              errorMessage.innerText = nextError;
            } else {
              // The user fixed the last error; no more errors.
              error.classList.remove('visible');
            }
          }
        });
      });

      // Listen on the form's 'submit' handler...
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Trigger HTML5 validation UI on the form if any of the inputs fail
        // validation.
        let plainInputsValid = true;
        Array.prototype.forEach.call(form.querySelectorAll('input'), (input) => {
          if (input.checkValidity && !input.checkValidity()) {
            plainInputsValid = false;
            return;
          }
        });
        if (!plainInputsValid) {
          triggerBrowserValidation();
          return;
        }

        // Show a loading screen...
        example.classList.add('submitting');

        // Disable all inputs.
        disableInputs();

        // Gather additional customer data we may have collected in our form.
        // var name = form.querySelector('#' + exampleName + '-name');
        // var address1 = form.querySelector('#' + exampleName + '-address');
        // var city = form.querySelector('#' + exampleName + '-city');
        // var state = form.querySelector('#' + exampleName + '-state');
        // var zip = form.querySelector('#' + exampleName + '-zip');
        // var additionalData = {
        //   name: name ? name.value : undefined,
        //   address_line1: address1 ? address1.value : undefined,
        //   address_city: city ? city.value : undefined,
        //   address_state: state ? state.value : undefined,
        //   address_zip: zip ? zip.value : undefined,
        // };
        // stripe.createToken(elements[0], additionalData).then((result) => {
        //   example.classList.remove('submitting');
        //
        //   if (result.token) {
        //     example.classList.add('submitted');
        //     console.log(result);
        //     nav.push(SettingsPage);
        //   } else {
        //     enableInputs();
        //   }
        // });
      });

      resetButton.addEventListener('click', function(e) {
        e.preventDefault();
        // Resetting the form (instead of setting the value to `''` for each input)
        // helps us clear webkit autofill styles.
        form.reset();

        // Clear each Element.
        elems.forEach(function(element) {
          element.clear();
        });

        // Reset error state as well.
        error.classList.remove('visible');

        // Resetting the form does not un-disable inputs, so we need to do it separately:
        enableInputs();
        example.classList.remove('submitted');
      });
    }



    const elements = stripe.elements({
    fonts: [
      {
        cssSrc: 'https://rsms.me/inter/inter-ui.css'
      }
    ]
  });

    /**
     * Card Element
     */
    const card = elements.create('card', {
      style: {
        base: {
          color: '#32325D',
          fontWeight: 500,
          fontFamily: 'Inter UI, Open Sans, Segoe UI, sans-serif',
          fontSize: '16px',
          fontSmoothing: 'antialiased',

          '::placeholder': {
            color: '#CFD7DF'
          }
        },
        invalid: {
          color: '#E25950'
        }
      }
    });

    card.mount('#example4-card');

    /**
     * Payment Request Element
     */
    const paymentRequest = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        amount: 20,
        label: 'Total'
      }
    });

    paymentRequest.on('token', function(result) {
      const example = document.querySelector('.example4');
      (example.querySelector('.token') as HTMLElement).innerText = result.token.id;
      example.classList.add('submitted');
      result.complete('success');
    });

    const paymentRequestElement = elements.create('paymentRequestButton', {
      paymentRequest: paymentRequest,
      style: {
        paymentRequestButton: {
          type: 'donate'
        }
      }
    });

    paymentRequest.canMakePayment().then(function(result) {
      if (result) {
        console.log(result);
        (document.querySelector('.example4 .card-only') as HTMLElement).style.display = 'none';
        (document.querySelector(
            '.example4 .payment-request-available'
        ) as HTMLElement).style.display =
            'block';
        paymentRequestElement.mount('#example4-paymentRequest');
      }
    });

    registerElements([card, paymentRequestElement], 'example4');

  }

}
