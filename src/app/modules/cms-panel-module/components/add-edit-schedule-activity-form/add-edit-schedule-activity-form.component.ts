/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: add-edit-schedule-activity-form.component.ts
 * Last modified | Ostatnia modyfikacja: 28/05/2022, 22:17
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

import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MiscHelper } from '../../../../utils/misc.helper';
import { NameWithId } from '../../models/cms-drop-lists-data.model';

import * as NgrxSelector_SMA from '../../ngrx-store/schedule-manipulator-ngrx-store/schedule-manipulator.selectors';
import { ScheduleManipulatorReducerType } from '../../ngrx-store/schedule-manipulator-ngrx-store/schedule-manipulator.selectors';

import { CmsGetAllConnectorService } from '../../services/cms-get-all-connector.service';
import { CmsGetQueryConnectorService } from '../../services/cms-get-query-connector.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za renderowanie formularza umożliwiającego dodanie nowej aktywności do planu zajęć
 * wybranej grupy dziekańskiej.
 */

@Component({
    selector: 'app-add-edit-schedule-activity-form',
    templateUrl: './add-edit-schedule-activity-form.component.html',
    styleUrls: [],
    providers: [ CmsGetAllConnectorService, CmsGetQueryConnectorService ],
})
export class AddEditScheduleActivityFormComponent implements OnInit, OnDestroy, OnChanges {

    public readonly _checkError = (name: string) => MiscHelper.checkNgFormError(this._addNewContentForm, name);

    public _subjQueryResultArray: Array<string> = new Array<string>();
    public _subjTypesQueryResultArray: Array<string> = new Array<string>();

    public _allWeeksData: Array<NameWithId> = new Array<NameWithId>();
    public _allStudyRooms: Array<NameWithId> = new Array<NameWithId>();
    public _allStudyTeachers: Array<NameWithId> = new Array<NameWithId>();

    private _deptAndSpecData?: { dept: number, spec: number };
    private _unsubscribe: Subject<void> = new Subject();

    @Input() _addNewContentForm!: FormGroup;

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _serviceAllGet: CmsGetAllConnectorService,
        private _serviceQueryGet: CmsGetQueryConnectorService,
        private _store: Store<ScheduleManipulatorReducerType>,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnInit(): void {
        this._serviceAllGet
            .getAllWeeksDataBaseCurrYear()
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(q => this._allWeeksData = q.map(el => ({ id: el, name: el })));
    };

    public ngOnChanges(changes: SimpleChanges): void {
        this._addNewContentForm!.get('subjectOrActivityName')?.valueChanges
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(() => {
                this._addNewContentForm?.get('subjectTeachers')?.patchValue([]);
                this.handleGetAllTeachersBaseDeptAndSubj();
            });
        this._store.select(NgrxSelector_SMA.sel_departmentAndStudySpecDataId)
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(deptAndSpecData => {
                this._deptAndSpecData = deptAndSpecData;
                if (this._deptAndSpecData?.dept !== null && this._deptAndSpecData?.spec !== null) {
                    this.handleEmitSubjectQuery('');
                    this.handleEmitSubjectTypeQuery('');
                    this.handleGetAllRoomsBaseDeptId();
                    this.handleGetAllTeachersBaseDeptAndSubj();
                }
            });
    };

    public ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    };

    public handleEmitSubjectTypeQuery(queryValue: string): void {
        this._serviceQueryGet
            .getQueryScheduleSubjectTypesList(queryValue)
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(q => this._subjTypesQueryResultArray = q.dataElements);
    };

    public handleEmitSubjectQuery(queryValue: string): void {
        this._serviceQueryGet
            .getQuerySubjectsBaseDeptAndSpec(queryValue, this._deptAndSpecData?.dept!, this._deptAndSpecData?.spec!)
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(q => this._subjQueryResultArray = q.dataElements);
    };

    public handleGetAllRoomsBaseDeptId(): void {
        this._serviceAllGet
            .getAllAvailableStudyRoomsBaseDept(this._deptAndSpecData?.dept!)
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(q => this._allStudyRooms = q);
    };

    public handleGetAllTeachersBaseDeptAndSubj(): void {
        this._serviceAllGet
            .getAllAvailableTeachersBaseDeptAndSpec(this._deptAndSpecData?.dept!,
                this._addNewContentForm.get('subjectOrActivityName')?.value)
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(q => this._allStudyTeachers = q);
    };
}