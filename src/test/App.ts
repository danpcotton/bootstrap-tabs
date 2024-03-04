import "./App.scss";
import { BootstrapTabs } from "../dancotton/bootstrap-tabs/BootstrapTabs";

new BootstrapTabs(<HTMLInputElement>document.getElementById("tabs"), {
    tabContentRenderer: (t: string, i: number) => `<span>£${t}</span>`,
    sort: (a: string, b: string) => { return parseFloat(a) - parseFloat(b); }
});
