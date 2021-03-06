/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: editor-redirect.guard.ts
 * Last modified | Ostatnia modyfikacja: 27/04/2022, 10:53
 * Project name | Nazwa Projektu: angular-po-schedule-management-client
 *
 * Klient | Client: <https://github.com/Milosz08/Angular_PO_Schedule_Management_Client>
 * Serwer | Server: <https://github.com/Milosz08/ASP.NET_PO_Schedule_Management_Server>
 *
 * Client for the ASP.NET Core application to manage schedule for sample university. Written with the Angular Framework
 * for generating dynamic web applications. Project for the teaching course "Objected Oriented Programming".
 *
 * Klient dla aplikacji ASP.NET Core służącej do zarządzania planem zajęć uczelni. Napisany przy użyciu frameworka
 * Angular do generowania dynamicznych aplikacji webowych. Projekt wykonany na zajęcia "Programowanie
 * Obiektowe".
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { RedirectCmsRoleGuard } from './redirect-cms-role.guard';
import { SessionReducerType } from '../../modules/shared-module/ngrx-store/session-ngrx-store/session.selectors';
import { UserIdentityType } from '../../types/user-identity.type';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Redirektor przekierowujący na stronę główną panelu zarządzania treścią w przypadku próby odwołania się do
 * chronionego zasobu do którego dostęp ma tylko administrator.
 */

@Injectable({
    providedIn: 'root',
})
export class AdminRedirectGuard extends RedirectCmsRoleGuard {

    public constructor(
        router: Router,
        store: Store<SessionReducerType>
    ) {
        super(router, store, [ UserIdentityType.ADMINISTRATOR ]);
    };
}