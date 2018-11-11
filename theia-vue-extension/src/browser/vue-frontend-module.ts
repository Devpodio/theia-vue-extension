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