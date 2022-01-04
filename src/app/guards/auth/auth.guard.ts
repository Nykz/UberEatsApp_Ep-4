import { Injectable } from '@angular/core';
// import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
       return this.auth.checkAuth().then(response => {
         console.log(response);
        if(response) return true;
        this.navigate();
        return false;
       })
       .catch(e => {
        this.navigate();
        return false;
       });
  }

  navigate() {
    this.router.navigateByUrl('/auth-screen', {replaceUrl: true});
  }
  
}
