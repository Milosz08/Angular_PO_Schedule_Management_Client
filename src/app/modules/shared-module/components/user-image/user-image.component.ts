/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: user-image.component.ts
 * Last modified | Ostatnia modyfikacja: 24/04/2022, 18:47
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

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import { UserIdentityType } from '../../../../types/user-identity.type';

import * as NgrxSelector_SES from '../../ngrx-store/session-ngrx-store/session.selectors';
import { InitialSessionStateTypes } from '../../ngrx-store/session-ngrx-store/session.initial';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent renderujący widok avataru użytkownika. Jeśli takowy nie znajduje się w storze, wygeneruje
 * podstawowy avatar składający się z inicjałów zalogowanego użytkownika. Jeśli użytkownik nie jest zalogowany
 * wyświetla podstawowe statyczne zdjęcie (tylko header).
 */

@Component({
    selector: 'app-user-image',
    templateUrl: './user-image.component.html',
    styleUrls: [ './user-image.component.scss' ]
})
export class UserImageComponent implements OnInit, OnDestroy {

    public _ifUserNotLogged$: Observable<boolean> = this._store.select(NgrxSelector_SES.sel_ifUserNotLogged);
    public _ifUserHasImage$: Observable<boolean> = this._store.select(NgrxSelector_SES.sel_ifUserHasImage);
    public _userInitials$: Observable<string> = this._store.select(NgrxSelector_SES.sel_userInitials);
    public _userRole$: Observable<UserIdentityType> = this._store.select(NgrxSelector_SES.sel_userRole);

    private _storeSubscription: Subscription | undefined;
    private _imageURL: string = '';

    @Input() public _ifShowLetter?: boolean = true;
    @Input() public _ifDarkBackgroundTheme?: boolean = false;

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _store: Store<InitialSessionStateTypes>,
        private _sanitizer: DomSanitizer,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnInit(): void {
        this._storeSubscription = this._store
            .select(NgrxSelector_SES.sel_userImageURL)
            .subscribe(imageURL => this._imageURL = imageURL);
    };

    public ngOnDestroy(): void {
        if (this._storeSubscription) {
            this._storeSubscription.unsubscribe();
        }
    };

    get __imageURL(): SafeUrl {
        return this._sanitizer.bypassSecurityTrustUrl(this._imageURL);
    };

    get __themeClass(): string {
        return this._ifDarkBackgroundTheme ? 'header-auth__icon--without-image--dark-theme' : '';
    };
}