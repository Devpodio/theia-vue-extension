import { ContainerModule } from "inversify";
import { LanguageServerContribution } from "@theia/languages/lib/node";
import { VueContribution } from './vue-contribution';

export default new ContainerModule(bind => {
    bind(LanguageServerContribution).to(VueContribution).inSingletonScope();
});