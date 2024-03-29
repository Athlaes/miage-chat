import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../service/auth.service";

export const AuthGuard = () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    if(!auth.isLogin()) {
        router.navigateByUrl('/login')
        return false
    }
    return true
}
