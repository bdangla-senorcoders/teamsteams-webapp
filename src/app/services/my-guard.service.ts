import { Injectable } from '@angular/core';
import {CanActivate,Router,ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import{AuthenticationService} from "./authentication.service";

@Injectable()
export class MyGuardService {

  constructor(private autorizacionService:AuthenticationService,private router: Router){
}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
  	let result=this.autorizacionService.userLogged()
    if(result && result.role.name=="Manager"){
        return true;
    }else {
      this.router.navigate(['/home']//, {
     //    queryParams: {
     //      return: state.url
    	// }
    //}
    );
    return false;
  }
}

}
