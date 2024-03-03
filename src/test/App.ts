import "./App.scss";
import { BootstrapTabs } from "../dancotton/bootstrap-tabs/BootstrapTabs";

new BootstrapTabs(<HTMLInputElement>document.getElementById("tabs"), {
    beforeAdd: (t: string) => { return t.startsWith('t'); },
});
