import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root',
})
export class NotAuthGuard implements CanActivate {
  constructor(private api: ApiService, private router: Router) {}

  user: [boolean] = [false];
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.api.getProfile().pipe(
      catchError((err) => {
        console.log(err);
        return of([]);
      }),
      map(
        (value: any) => {
          if (value.status == 'success') {
            this.router.navigate(['/']);
            return false;
          } else {
            // this.router.navigate(['/']);
            return true;
          }
        },
        (err: any) => {
          return true;
        }
      )
    );
  }
}
