import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoadingSpinnerComponent } from '../shared/spinner/loading-spinner.component';
import { AuthComponent } from './auth.component';

@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: AuthComponent }]),
  ],
  exports: [],
  declarations: [AuthComponent],
  providers: [],
})
export class AuthModule {}
