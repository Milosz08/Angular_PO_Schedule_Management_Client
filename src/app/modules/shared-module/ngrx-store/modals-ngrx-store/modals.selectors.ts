/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: modals.selectors.ts
 * Last modified | Ostatnia modyfikacja: 02/05/2022, 17:35
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

import { InitialModalsStateTypes } from './modals.initial';

//----------------------------------------------------------------------------------------------------------------------

export const MODALS_REDUCER = 'modalsReducer' as const;
const getModalsState = createFeatureSelector<InitialModalsStateTypes>(MODALS_REDUCER);

export type ModalsReducerType = { [MODALS_REDUCER]: InitialModalsStateTypes };

const selectorWithInjectedStore = (payload: (state: any, action?: any) => any) => (
    createSelector(getModalsState, payload)
);

//----------------------------------------------------------------------------------------------------------------------

export const sel_sessionEndModalVisibility = selectorWithInjectedStore(
    state => state.sessionEndModalVisibility,
);

export const sel_logoutModalVisibility = selectorWithInjectedStore(
    state => state.logoutModalVisibility,
);

export const sel_removeModalVisibility = selectorWithInjectedStore(
    state => state.deleteContentModal.modalVisibility,
);

export const sel_scheduleSubjectDetailsModalVisibility = selectorWithInjectedStore(
    state => state.scheduleSubjectDetailsModalVisibility,
);

export const sel_selectedSubjectId = selectorWithInjectedStore(
    state => state.selectedSubjectId,
);

export const sel_suspenseRemovingContent = selectorWithInjectedStore(
    state => state.deleteContentModal.suspenseRemovingContent,
)

export const sel_removeModalServerMessage = selectorWithInjectedStore(
    state => state.deleteContentModal.removeServerMessage.message,
);

export const sel_serverMessageIfError = selectorWithInjectedStore(
    state => state.deleteContentModal.removeServerMessage.ifError,
);