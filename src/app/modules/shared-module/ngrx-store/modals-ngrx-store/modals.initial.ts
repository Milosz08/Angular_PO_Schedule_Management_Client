/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: modals.initial.ts
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

export interface InitialModalsStateTypes {
    sessionEndModalVisibility: boolean;
    logoutModalVisibility: boolean;
    scheduleSubjectDetailsModalVisibility: boolean;
    selectedSubjectId: number | null;
    deleteContentModal: {
        removeContentPath: string;
        removeContentIds: Array<number>;
        modalVisibility: boolean;
        removeServerMessage: {
            message: string;
            ifError: boolean;
        };
        suspenseRemovingContent: boolean;
    };
}

//----------------------------------------------------------------------------------------------------------------------

export const initialModalsState: InitialModalsStateTypes = {
    sessionEndModalVisibility: false,
    logoutModalVisibility: false,
    scheduleSubjectDetailsModalVisibility: false,
    selectedSubjectId: null,
    deleteContentModal: {
        removeContentPath: '',
        removeContentIds: [],
        modalVisibility: false,
        removeServerMessage: {
            message: '',
            ifError: false,
        },
        suspenseRemovingContent: false,
    },
};