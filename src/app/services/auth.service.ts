import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable ,tap} from 'rxjs';


//creation interface de la reponse
export interface AuthResponseData{
  kind:string;
  idToken:string;
  email:string;
  refreshToken:string;
  localId:string;
  expireIn:string;
  registered?:boolean
  displayName:string
  userId:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userIdSubject = new BehaviorSubject<string | null>(null);
  private displayNameSubject = new BehaviorSubject<string | null>(null);

  constructor(private http:HttpClient) {this.autoLogin(); }

    //recuperer l'id de l'utilisateur connecter
  get userId(): Observable<string | null> {
    return this.userIdSubject.asObservable();
  }
    // récupérer le nom d'utilisateur connecté
    get displayName(): Observable<string | null> {
      return this.displayNameSubject.asObservable();
    }

  public isAuthenticated(): boolean {
    // Par exemple, vérifiez si un jeton est présent dans le localStorage
    return !!localStorage.getItem('authToken');
  }

  signUp(email:string, password:string,displayName:string):Observable<AuthResponseData>{
    const apiKey="AIzaSyCqMcZ1yScsf2LUU9tIx0jmmyQAWpeiwpA";
    const url= `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
    return this.http.post<AuthResponseData>(url, {email, password, displayName,returnSecureToken:true});
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    const apiKey = 'AIzaSyCqMcZ1yScsf2LUU9tIx0jmmyQAWpeiwpA';
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

    return this.http.post<AuthResponseData>(url, { email, password, returnSecureToken: true })
      .pipe(
        tap(response => {
          this.userIdSubject.next(response.localId);
        this.displayNameSubject.next(response.displayName);  // Ajoutez cette ligne pour mettre à jour le nom d'utilisateur
        localStorage.setItem('authToken', response.idToken);
        localStorage.setItem('userId', response.localId);
        localStorage.setItem('displayName', response.displayName);  // Ajoutez cette ligne pour sauvegarder le nom d'utilisateur
        })
      );
  }
  autoLogin() {
    const authToken = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

    if (authToken && userId) {
      this.userIdSubject.next(userId);
      this.autoLoadDisplayName();  // Ajoutez cette ligne pour charger le nom d'utilisateur
    }
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    this.userIdSubject.next(null);
  }

  private autoLoadDisplayName() {
    const displayName = localStorage.getItem('displayName');
    if (displayName) {
      this.displayNameSubject.next(displayName);
    }
  }
}
