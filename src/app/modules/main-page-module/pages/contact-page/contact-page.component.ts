/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: contact-page.component.ts
 * Last modified | Ostatnia modyfikacja: 09/04/2022, 16:59
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

import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { AllMainWebpages, MetaWebContentHelper } from '../../../../utils/meta-web-content.helper';

import * as NgrxSelector_SES from '../../../shared-module/ngrx-store/session-ngrx-store/session.selectors';
import { SessionReducerType } from '../../../shared-module/ngrx-store/session-ngrx-store/session.selectors';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Widok odpowiadający za generowanie strony umożliwiającej wysłanie wiadomości do systemu.
 */

@Component({
    selector: 'app-contact-page',
    templateUrl: './contact-page.component.html',
    styleUrls: [ './contact-page.component.scss' ]
})
export class ContactPageComponent extends MetaWebContentHelper {

    public _ifNotLogged$: Observable<boolean> = this._store.select(NgrxSelector_SES.sel_ifUserNotLogged);

    constructor(
        titleService: Title,
        metaService: Meta,
        private _store: Store<SessionReducerType>,
    ) {
        super(titleService, metaService, AllMainWebpages.BOOKING);
    };
}