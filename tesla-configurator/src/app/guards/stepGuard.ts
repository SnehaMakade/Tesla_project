import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AppService } from '../app.service';


@Injectable({
  providedIn: 'root'
})
export class Step2Guard implements CanActivate {
  constructor(private service: AppService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    const selectedModel = await this.service.selectedModel$.pipe(
      take(1),
      map(selectedModel => !!selectedModel) // Convert selectedModel to boolean
    ).toPromise();
    if (selectedModel) {
      return true;
    } else {
      this.router.navigate(['/step1']);
      return false;
    }
  }
}


@Injectable({
  providedIn: 'root'
})
export class Step3Guard implements CanActivate {
  constructor(private service: AppService, private router: Router) { }
  async canActivate(): Promise<boolean> {
    const selectedConfigId = await this.service.selectedConfigId$.pipe(
      take(1),
      map(selectedConfigId => !!selectedConfigId)
    ).toPromise();

    if (selectedConfigId) {
      return true;
    } else {
      this.router.navigate(['/step2']);
      return false;
    }
  }
}
