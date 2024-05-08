import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  showLogin: boolean = true;
  registeredEmail: string='';
  registeredPassword:string=''

  constructor(private authService:AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const displayName=form.value.displayName;
    this.registeredEmail = email;
    this.registeredPassword=password

    //console.log(email)
    this.authService.signUp(email, password,displayName).subscribe(
      responseData => {
        console.log(responseData);
        this.onLogin(form);
      },
      error => {
        console.error(error);
      }
    );
    if (form) {
      form.reset();
    }

  }

  onLogin(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email || this.registeredEmail;
    const password = form.value.password||this.registeredPassword

    this.authService.login(email, password).subscribe(
      responseData => {
        console.log(responseData);
         // Redirection vers tabs après une connexion réussie
         this.router.navigateByUrl('/tabs');
      },
      error => {
        console.error(error);
        // Gérez l'erreur ici (par exemple, affichez un message d'erreur à l'utilisateur)
      }
    );
    if (form) {
      form.reset();
    }
  }

  toggleForm() {
    this.showLogin = !this.showLogin; // Inversez la valeur de showLogin pour basculer entre les formulaires
  }

}
