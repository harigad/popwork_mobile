import { NgModule } from '@angular/core';
import { StripePaymentComponent } from './stripe-payment/stripe-payment';
@NgModule({
  declarations: [
      StripePaymentComponent
  ],
  entryComponents: [

  ],
  imports: [],
  exports: [
      StripePaymentComponent,
  ]
})
export class ComponentsModule {}
