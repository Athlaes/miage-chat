import { Routes } from '@angular/router';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { MessagerieComponent } from './pages/messagerie/messagerie.component';
import { AuthGuard } from './shared/helpers/AuthGuard';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'messagerie' },
    { path: 'login', component: ConnexionComponent},
    { path: 'register', component: InscriptionComponent },
    { path: 'messagerie', component: MessagerieComponent, canActivate: [AuthGuard] }
];
