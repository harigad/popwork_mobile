import { NgModule } from '@angular/core';
import { StripePaymentComponent } from './stripe-payment/stripe-payment';
import { ContactComponent } from './contact/contact.component';
@NgModule({
  declarations: [
      StripePaymentComponent,
    // ContactComponent
  ],
  entryComponents: [

  ],
  imports: [],
  exports: [
      StripePaymentComponent,
    // ContactComponent
  ]
})
export class ComponentsModule {}
