export class AuthSuccess{
  static readonly type = '[Auth] Auth Success';

  constructor(
    public payload:{
      email: string, 
      userId: string, 
      token: string, 
      expirationDate:Date,
      redirect:boolean
    }
    ){}
}

export class Logout{
  static readonly type = '[Auth] Logout';

}

export class AuthStart{
  static readonly type = '[Auth] Auth Start';

  constructor(public payload:{email: string, password: string}){}
}


export class AuthFail{
  static readonly type = '[Auth] Auth Fail';

  constructor(public payload: string){}
}

export class SignupStart{
  static readonly type = '[Auth] Signup Start';

  constructor(public payload:{email: string, password: string}){}
}

export class ClearError{
  static readonly type = '[Auth] Clear Error'
}

export class AutoLogin {
  static readonly type = '[Auth] Auto Login'
}
