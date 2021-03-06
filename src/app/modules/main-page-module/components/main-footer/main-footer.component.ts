/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: main-footer.component.ts
 * Last modified | Ostatnia modyfikacja: 17/04/2022, 13:16
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

import MainPageNavigationMockedData from '../../../../mocked-data/main-page-navigation-content.json';
import AuthorizationNavigationContent from '../../../../mocked-data/authorization-navigation-content.json';

import { MainNavigationModel } from '../../models/main-navigation.model';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Widok odpowiadający za generowanie widoku głównej stopki aplikacji na stronach niestrzeżonych.
 */

@Component({
    selector: 'app-main-footer',
    templateUrl: './main-footer.component.html',
    styleUrls: [ './main-footer.component.scss' ],
})
export class MainFooterComponent {

    public readonly _navigationData: MainNavigationModel[];
    public readonly _authNavigationData: MainNavigationModel[];

    //------------------------------------------------------------------------------------------------------------------

    public constructor() {
        this._navigationData = MainPageNavigationMockedData;
        this._authNavigationData = AuthorizationNavigationContent;
    };
}