/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: remove-content-modal.component.ts
 * Last modified | Ostatnia modyfikacja: 13/05/2022, 15:16
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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MiscHelper } from '../../../../utils/misc.helper';
import { fadeInOutAnimation } from '../../../../animations/fade-animations';

import * as NgrxAction_MOD from '../../ngrx-store/modals-ngrx-store/modals.actions';
import * as NgrxSelector_MOD from '../../ngrx-store/modals-ngrx-store/modals.selectors';
import * as NgrxSelector_SES from '../../ngrx-store/session-ngrx-store/session.selectors';

import { UserCredentialsType } from '../../../../types/user-credentials.type';
import { ModalsReducerType } from '../../ngrx-store/modals-ngrx-store/modals.selectors';
import { SessionReducerType } from '../../ngrx-store/session-ngrx-store/session.selectors';

import { SuspenseService } from '../../services/suspense.service';

//----------------------------------------------------------------------------------------------------------------------

type CombinedReducers = ModalsReducerType | SessionReducerType;

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiadający za renderowanie modala odpowiadającego za potwierdzenie usuwania treści z serwera.
 */

@Component({
    selector: 'app-remove-content-modal',
    templateUrl: './remove-content-modal.component.html',
    styleUrls: [ './remove-content-modal.component.scss' ],
    animations: [ fadeInOutAnimation ],
})
export class RemoveContentModalComponent implements OnInit, OnDestroy {

    public readonly _authPassForm: FormGroup;
    public readonly _checkError = (name: string) => MiscHelper.checkNgFormError(this._authPassForm, name);

    private _userLogin: string = '';
    public _srvMessage: string = '';
    public _submitDisabled: boolean = false;

    private _unsubscribe: Subject<void> = new Subject();

    public _modalVisibility$: Observable<boolean> = this._store.select(NgrxSelector_MOD.sel_removeModalVisibility);
    public _ifSuspenseVisible$: Observable<boolean> = this._store.select(NgrxSelector_MOD.sel_suspenseRemovingContent);
    public _ifMessageError$: Observable<boolean> = this._store.select(NgrxSelector_MOD.sel_serverMessageIfError);
    public _serverMessage$: Observable<string> = this._store.select(NgrxSelector_MOD.sel_removeModalServerMessage);

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _router: Router,
        private _store: Store<CombinedReducers>,
        private _suspenseService: SuspenseService,
    ) {
        this._authPassForm = new FormGroup({
            password: new FormControl('', [ Validators.required ]),
        });
        this._authPassForm.valueChanges.pipe(takeUntil(this._unsubscribe)).subscribe(() => {
            if (this._srvMessage !== '') {
                this._submitDisabled = false;
                this._store.dispatch(NgrxAction_MOD.__clearServerMessageRemoveContentModal());
            }
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnInit(): void {
        this._store
            .pipe(takeUntil(this._unsubscribe), select(NgrxSelector_SES.sel_userLogin))
            .subscribe(userLogin => this._userLogin = userLogin);
        this._serverMessage$
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(message => this._srvMessage = message);
    };

    public ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    };

    public handleRemoveElements(): void {
        const { password } = this._authPassForm.getRawValue();
        this._submitDisabled = true;
        const credentials: UserCredentialsType = { username: this._userLogin, password };
        this._store.dispatch(NgrxAction_MOD.__setSuspenseRemovingContentModal({ visibility: true }));
        this._store.dispatch(NgrxAction_MOD.__removeContentModal({ credentials }));
    };

    public handleCloseRemoveElementsModal(): void {
        this._store.dispatch(NgrxAction_MOD.__closeRemoveContentModal());
        this._suspenseService.reloadAngularPageWithRouter();
        this._authPassForm.reset();
        this._submitDisabled = false;
    };
}