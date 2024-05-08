export class User{
  constructor(public id:string,
    public email:string,
     private _token:string,
      private tokenExpirationDate:Date){}
}
