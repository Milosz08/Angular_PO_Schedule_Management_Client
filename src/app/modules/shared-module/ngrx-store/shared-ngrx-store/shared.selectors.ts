/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: shared.selectors.ts
 * Last modified | Ostatnia modyfikacja: 02/05/2022, 16:35
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

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { InitialSharedStateTypes } from './shared.initial';

//----------------------------------------------------------------------------------------------------------------------

export const SHARED_REDUCER = 'sharedReducer' as const;
const getSharedState = createFeatureSelector<InitialSharedStateTypes>(SHARED_REDUCER);

export type SharedReducerType = { [SHARED_REDUCER]: InitialSharedStateTypes };

const selectorWithInjectedStore = (payload: (state: any, action?: any) => any) =>
    createSelector(getSharedState, payload);

//----------------------------------------------------------------------------------------------------------------------

export const sel_suspenseLoading = selectorWithInjectedStore(
    state => state.suspenseLoading,
);

export const sel_rememberScheduleDataLinks = selectorWithInjectedStore(
    state => state.allRememberScheduleData,
);