export interface TCredentials {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  kind: string;
  registered?: boolean;
}
