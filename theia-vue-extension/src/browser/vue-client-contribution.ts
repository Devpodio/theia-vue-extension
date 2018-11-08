import { injectable, inject } from "inversify";
import { BaseLanguageClientContribution, Workspace, Languages, LanguageClientFactory } from '@theia/languages/lib/browser';
import { VUE_LANGUAGE_ID, VUE_LANGUAGE_NAME } from '../common';

@injectable()
export class VueClientContribution extends BaseLanguageClientContribution {

    readonly id = VUE_LANGUAGE_ID;
    readonly name = VUE_LANGUAGE_NAME;

    constructor(
        @inject(Workspace) protected readonly workspace: Workspace,
        @inject(Languages) protected readonly languages: Languages,
        @inject(LanguageClientFactory) protected readonly languageClientFactory: LanguageClientFactory
    ) {
        super(workspace, languages, languageClientFactory);
    }

    protected get globPatterns() {
        return [ '**/*.vue' ];
    }
}