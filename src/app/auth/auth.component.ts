import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { TCredentials } from './auth.model';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { state } from '@angular/animations';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode: boolean = true;
  isLoading = false;
  weHaveError: string = null;
  private closeSub: Subscription;
  private storeSub: Subscription;
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {}
  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.weHaveError = authState.authError;
      if (this.weHaveError) {
        this.showErrorAlert(this.weHaveError);
      }
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    const auth: TCredentials = {
      email: authForm.value.email,
      password: authForm.value.password,
      returnSecureToken: true,
    };

    this.isLoading = true;
    if (this.isLoginMode) {
      this.store.dispatch(
        new AuthActions.LoginStart({
          email: auth.email,
          password: auth.password,
        })
      );
    } else {
      this.store.dispatch(
        new AuthActions.SignupStart({
          email: auth.email,
          password: auth.password,
        })
      );
    }

    authForm.reset();
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError());
  }

  private showErrorAlert(message: string) {
    const alertCmpFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
