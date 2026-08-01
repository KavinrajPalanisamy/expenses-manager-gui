import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { switchMap, map, catchError, first } from 'rxjs/operators';
import { UserService } from '../../services/user.service';

export function usernameExistsValidator(userService: UserService, keyName: string): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {

    if (!control.value || control.value.length < 4) {
      return of(null);
    }

    return timer(800).pipe(
      switchMap(() => userService.checkUserExists(`${keyName}=${control.value}`)),
      map(exists => (exists ? { isUserExits: true } : null)),
      catchError(() => of(null)),
      first()
    );
  };
}
