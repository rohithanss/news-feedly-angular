import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of, pipe } from 'rxjs';
import { map, first, catchError } from 'rxjs/operators';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private api: ApiService, private router: Router) {}
  user: [boolean] = [false];
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.api.getProfile().pipe(
      catchError((err) => of([])),
      map(
        (value) => {
          if (value.status == 'success') {
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        },
        (err: any) => {
          this.router.navigate(['/login']);

          return false;
        }
      )
    );
    // console.log(r);

    // return false;
  }
}
