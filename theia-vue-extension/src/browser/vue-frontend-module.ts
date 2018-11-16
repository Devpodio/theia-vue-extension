/********************************************************************************
 * Copyright (C) 2018 Uni Sayo and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
********************************************************************************/

import { VueClientContribution } from './vue-client-contribution';
import { LanguageClientContribution } from "@theia/languages/lib/browser";
import { ContainerModule, interfaces } from "inversify";
import { LanguageGrammarDefinitionContribution } from '@theia/monaco/lib/browser/textmate';
import { VueGrammarContribution } from './vue-grammar-contribution';

export default new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind, isBound: interfaces.IsBound, rebind: interfaces.Rebind) => {
    bind(VueClientContribution).toSelf().inSingletonScope();
    bind(LanguageClientContribution).toService(VueClientContribution);
    bind(LanguageGrammarDefinitionContribution).to(VueGrammarContribution).inSingletonScope();
});