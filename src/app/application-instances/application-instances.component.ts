/**
 * Copyright (c) 2016 University of Stuttgart.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * and the Apache License 2.0 which both accompany this distribution,
 * and are available at http://www.eclipse.org/legal/epl-v10.html
 * and http://www.apache.org/licenses/LICENSE-2.0
 *
 * Contributors:
 *     Michael Falkenthal - initial implementation
 */
import { Component, OnInit, ViewChild, trigger, state, style, transition, animate } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApplicationService } from '../shared/application.service';
import { Application } from '../shared/model/application.model';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { PlanParameter } from '../shared/model/plan-parameter.model';
import { PlanParameters } from '../shared/model/plan-parameters.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ResourceReference } from "../shared/model/resource-reference.model";

@Component({
    selector: 'opentosca-application-instances',
    templateUrl: 'application-instances.component.html',
    animations: [
        trigger('fadeInOut', [
            state('in', style({'opacity': 1})),
            transition('void => *', [
                style({'opacity': 0}),
                animate('500ms ease-out')
            ]),
            transition('* => void', [
                style({'opacity': 1}),
                animate('500ms ease-in')
            ])
        ])
    ]
})

export class ApplicationInstancesComponent implements OnInit {
    public app: Application;
    public instancesList: Array<ResourceReference>;

    @ViewChild('childModal') public childModal: ModalDirective;

    constructor(private route: ActivatedRoute,
                private appService: ApplicationService) {
    }

    ngOnInit(): void {
        this.appService.getAllInstances()
            .then(result => this.instancesList = result);

        // TODO: why iteration?
        this.route.params.forEach((params: Params) => {
            this.appService.getAppDescription(params['id'])
                .then(app => this.app = app);
        });

    }
}
