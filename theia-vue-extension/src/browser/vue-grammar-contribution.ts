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