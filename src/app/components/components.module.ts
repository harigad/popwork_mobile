import { NgModule } from '@angular/core';
import { StripePaymentComponent } from './stripe-payment/stripe-payment';
import { ContactComponent } from './contact/contact.component';
// import { PlacesComponent } from './places/places.component';
@NgModule({
  declarations: [
      StripePaymentComponent,
      // PlacesComponent,
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
