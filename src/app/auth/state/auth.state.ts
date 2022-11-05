import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Action, State, StateContext } from "@ngxs/store";
import { AuthService } from "../auth.service";
import { User } from "../user.model";
import { AuthSuccess } from "./auth.actions";

export interface AuthStateModel {
  user: User,
  authError: string,
  loading: boolean,
}

@State<AuthStateModel>({
  name:'authState',
  defaults: {
    user: null,
    authError: null,
    loading: false,
  }
})

export class AuthState {
  
  constructor(
    private http: HttpClient,
    private router:Router,
    private AuthService: AuthService,
  ){}

  @Action(AuthSuccess)
  AuthSuccess(
    ctx:StateContext<AuthStateModel>,
    action: AuthSuccess
  ) {
    const user = new User(
      action.payload.email, 
      action.payload.userId,
      action.payload.token,
      action.payload.expirationDate
    );
    ctx.patchState({
      user: user,
      loading: false
    })
  }


}