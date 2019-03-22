/********************************************************************************
 * Copyright (C) 2019 Uni Sayo and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import { AbstractDefaultCallHierarchyService } from '@theia/callhierarchy/lib/browser/callhierarchy-service-impl';
import { VUE_LANGUAGE_ID } from '../common';

export class VueCallHierarchyService extends AbstractDefaultCallHierarchyService {
  readonly languageId: string = VUE_LANGUAGE_ID;
}
