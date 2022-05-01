/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: first-change-password.effects.ts
 * Last modified | Ostatnia modyfikacja: 30/04/2022, 23:33
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

import { catchError, map, mergeMap, of, tap, withLatestFrom } from 'rxjs';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ReducerAction from '../session.actions';
import { SESSION_REDUCER } from '../session.selectors';
import { AppGlobalState } from '../../combine-reducers';

import { AuthService } from '../../../services/auth.service';
import { FirstChangePasswordStorageService } from '../../../services/first-change-password-storage.service';
import { setSuspenseLoader } from '../../shared-ngrx-store/shared.actions';

/**
 * Klasa efektów odpowiedzialna za obsługę zmiany początkowego hasła wygenerowanego przez system.
 */

@Injectable()
export class FirstChangePasswordEffects {

    public constructor(
        private _router: Router,
        private _actions$: Actions,
        private _authService: AuthService,
        private _store: Store<AppGlobalState>,
        private _storageService: FirstChangePasswordStorageService,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt uruchamiający procedurę przekierowania na stronę umożliwiająca zmianę domyślnego hasła. Następuje to
     * tylko wtedy, gdy użytkownik jeszcze nie zmienił hasłą, bądź niezablokował tej strony ręcznie.
     */
    public userSuccesedLoginRedirectToChangePassword$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(ReducerAction.userSuccessLogin),
            withLatestFrom(this._store.select(SESSION_REDUCER)),
            tap(([ _, state ]) => {
                if (state.userData) {
                    const ifBlockedByUser = this._storageService
                        .checkIfFirstChangePasswordIsDisabled(state.userData.dictionaryHash);
                    if (state.userData.firstAccess && !ifBlockedByUser) {
                        this._router.navigate([ '/auth/first-change-password' ]).then(r => r);
                    }
                }
            }),
        );
    }, { dispatch: false });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt manipulujący widocznością strony umożliwiającej zmianę początkowego hasła
     * (manipulacja poprzez wywoływanie serwisu _storageService).
     */
    public userChangePasswordPageVisibility$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(ReducerAction.userToggleChangePasswordPageVisible),
            withLatestFrom(this._store.select(SESSION_REDUCER)),
            tap(([ action, state ]) => {
                if (state.userData) {
                    if (action.pageVisibility) {
                        this._storageService.activeDisabledFirstChangePage(state.userData.dictionaryHash);
                    } else {
                        this._storageService.removeDisabledFirstChangePage(state.userData.dictionaryHash);
                    }
                }
            }),
        );
    }, { dispatch: false });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt odpowiedzialny za zmianę początkowego hasła użytkownika. Komunikuje się z API poprzez
     * serwis _authService i ustawia odpowiednio wartość messsage w ngrx storze.
     */
    public userChangeDefaultPassword$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(ReducerAction.userChangeDefaultPassword),
            withLatestFrom(this._store.select(SESSION_REDUCER)),
            mergeMap(([ action, state ]) => {
                return this._authService
                    .userChangeDefaultPassword(state.userData!.dictionaryHash, action.passwordsPayload)
                    .pipe(
                        map(({ message }) => {
                            setTimeout(() => this._store.dispatch(setSuspenseLoader({ status: false })), 1000);
                            this._storageService.activeDisabledFirstChangePage(state.userData!.dictionaryHash);
                            setTimeout(() => {
                                this._store.dispatch(ReducerAction.userResetChangeDefaultPasswordMessage());
                                this._router.navigate([ "/" ]).then(r => r);
                            }, 5000);
                            return ReducerAction.userAfterChangeDefaultPassword({
                                message: `${message} Przekierowanie...`,
                            });
                        }),
                        catchError(({ error }) => {
                            setTimeout(() => this._store.dispatch(setSuspenseLoader({ status: false })), 1000);
                            return of(ReducerAction.userAfterChangeDefaultPassword({ message: error.message }));
                        }),
                    );
            }),
        );
    });
}