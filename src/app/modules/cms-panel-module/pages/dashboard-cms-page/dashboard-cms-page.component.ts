/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: dashboard-cms-page.component.ts
 * Last modified | Ostatnia modyfikacja: 09/04/2022, 17:23
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

import { AllCmsWebpages, MetaWebContentHelper } from '../../../../utils/meta-web-content.helper';

/**
 *
 */

@Component({
    selector: 'app-dashboard-cms-page',
    templateUrl: './dashboard-cms-page.component.html',
    styleUrls: [ './dashboard-cms-page.component.scss' ]
})
export class DashboardCmsPageComponent extends MetaWebContentHelper {

    constructor(
        titleService: Title,
        metaService: Meta,
    ) {
        super(titleService, metaService, AllCmsWebpages.DASHBOARD);
    };
}