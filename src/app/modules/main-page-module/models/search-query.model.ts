/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: search-query.model.ts
 * Last modified | Ostatnia modyfikacja: 01/06/2022, 23:00
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

export interface SearchQueryReqModel {
    searchQuery: string;
    ifGroupsActive: boolean;
    ifTeachersActive: boolean;
    ifRoomsActive: boolean;
}

//----------------------------------------------------------------------------------------------------------------------

export interface SearchQueryResModel {
    pathQueryParams: { [key: string]: number };
    departmentName: string;
    pathParam: string;
    typeName: string;
    fullName: string;
}