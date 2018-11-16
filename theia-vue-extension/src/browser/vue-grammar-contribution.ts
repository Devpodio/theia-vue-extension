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

import { LanguageGrammarDefinitionContribution, TextmateRegistry } from "@theia/monaco/lib/browser/textmate";
import { injectable } from "inversify";
import { VUE_LANGUAGE_ID, VUE_LANGUAGE_NAME } from "../common";

@injectable()
export class VueGrammarContribution implements LanguageGrammarDefinitionContribution {

    readonly scopeName = 'text.html.vue';

    registerTextmateLanguage(registry: TextmateRegistry) {
        monaco.languages.register({
            id: VUE_LANGUAGE_ID,
            extensions: ['.vue'],
            aliases: [VUE_LANGUAGE_NAME, 'vue']
        });
        monaco.languages.setLanguageConfiguration(VUE_LANGUAGE_ID, {
            wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)/g,

            comments: {
                lineComment: "//",
                blockComment: ["/*", "*/"]
            },

            brackets: [
                ['<', '>'],
                ['{', '}'],
                ['(', ')']
            ],

            autoClosingPairs: [
                { open: '{', close: '}' },
                { open: '[', close: ']' },
                { open: '(', close: ')' },
                { open: '"', close: '"' },
                { open: '\'', close: '\'' }
            ],

            surroundingPairs: [
                { open: '"', close: '"' },
                { open: '\'', close: '\'' },
                { open: '{', close: '}' },
                { open: '[', close: ']' },
                { open: '(', close: ')' },
                { open: '<', close: '>' },
            ]
        });
        const grammar = require('../../data/vue.tmLanguage.json');
        registry.registerTextmateGrammarScope(this.scopeName, {
            async getGrammarDefinition() {
                return {
                    format: 'json',
                    content: grammar
                };
            }
        });
        registry.mapLanguageIdToTextmateGrammar(VUE_LANGUAGE_ID, this.scopeName);
    }
}