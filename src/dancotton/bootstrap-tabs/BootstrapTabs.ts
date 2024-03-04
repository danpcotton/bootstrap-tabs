export interface BSSettings
{
    disableDelete?: boolean;
    beforeAdd?: (text: string) => boolean; // Validation
    sortItems?: boolean;
    sort?: (a: string, b: string) => number;
    valueSeparator?: string;
    tabClassList?: Array<string>;
    deleteBtnClassList?: Array<string>;
    tabContentRenderer?: (text: string, index: number) => string;
    deleteContentRenderer?: (text: string, index: number) => string;
}

export class BootstrapTabs
{
    private _element: HTMLInputElement;
    private _elementDisplayValue: string;
    private _settings: BSSettings;

    private changeListener: (e: Event) => void;

    private container: HTMLDivElement;
    private tabsContainer: HTMLDivElement;
    private dummyInput: HTMLInputElement;
    private items: Array<string> = [];
    private tabs: Array<HTMLDivElement> = [];

    constructor(element: HTMLInputElement, settings: BSSettings = null)
    {
        this._element = element;
        this._settings = settings;
        this.init();
    }

    private init(): void
    {
        this._elementDisplayValue = this._element.style.display; // Cache
        this._element.style.display = "none";
        this.create();

        this.changeListener = this.onChangedTriggered.bind(this);
        this.addListeners();
    }

    private create(): void
    {
        // Container to keep eveything in
        this.container = document.createElement("div");
        this.container.classList.add("bs-tabs-container");

        // Tabs container
        this.tabsContainer = document.createElement("div");
        this.tabsContainer.classList.add("bs-tabs-tabs-container"); // GG naming at 9:42pm
        this.container.appendChild(this.tabsContainer);

        // Dummy replicates the existing input to handle the 'current' text
        this.dummyInput = document.createElement("input");
        this.dummyInput.type = "text";
        this.dummyInput.placeholder = this._element.placeholder;
        this.dummyInput.classList.add("form-control");
        this.container.appendChild(this.dummyInput);

        // Add to DOM
        this._element.parentElement.insertBefore(this.container, this._element.nextElementSibling);
    }

    private onChangedTriggered(e: Event): void
    {
        let text: string = this.dummyInput.value;
        let valid: boolean = true;

        if (this._settings?.beforeAdd)
        {
            valid = this._settings.beforeAdd(text);
        }

        if (text.length && valid)
        {
            this.items.push(text);
            this.drawItems();
            this.dummyInput.value = "";

            // Update element value
            let valueSeparator: string = this._settings?.valueSeparator ?? ',';
            this._element.value = this.items.join(valueSeparator);
        }

        e.preventDefault();
        e.stopImmediatePropagation();
    }

    private drawItems(): void
    {
        // Remove existing
        while (this.tabs.length)
        {
            let tab: HTMLDivElement = this.tabs.shift();
            this.tabsContainer.removeChild(tab);
        }

        // Sort ...or not
        if (this._settings?.sortItems || this._settings?.sort != null)
        {
            if (this._settings.sort)
            {
                this.items.sort(this._settings.sort);
            }
            else
            {
                this.items.sort();
            }
        }

        for (let i: number = 0; i < this.items.length; i++)
        {
            let tab: HTMLDivElement = this.createTab(this.items[i], i);
            this.tabsContainer.appendChild(tab);
            this.tabs.push(tab);
        }
    }

    private createTab(text: string, index: number): HTMLDivElement
    {
        let tab: HTMLDivElement = document.createElement("div");

        let tabClasses: Array<string> = ["bs-tabs-tab"]; // Always add these
        tabClasses.push(...(this._settings?.tabClassList ?? [
            "badge",
            "bg-light",
            "text-dark"
        ]));
        tab.classList.add(...tabClasses);

        let tabContent: string = `<span>${text}</span>`;
        if (this._settings?.tabContentRenderer)
        {
            tabContent = this._settings.tabContentRenderer(text, index);
        }
        tab.innerHTML = tabContent;

        if (!this._settings?.disableDelete)
        {
            let deleteBtn = document.createElement("button");
            deleteBtn.type = "button";
            let deleteBtnClasses: Array<string> = [];
            deleteBtnClasses.push(...(this._settings?.deleteBtnClassList ?? ["btn", "btn-sm", "text-dark"]));
            deleteBtn.classList.add(...deleteBtnClasses);

            let deleteContent = `<i class="bi bi-x-circle"></i>`;
            if (this._settings?.deleteContentRenderer)
            {
                deleteContent = this._settings.deleteContentRenderer(text, index);
            }
            deleteBtn.innerHTML = deleteContent;

            deleteBtn.addEventListener("click", this.removeTab.bind(this, text));
            tab.appendChild(deleteBtn);
        }

        return tab;
    }

    private removeTab(text: string): void
    {
        this.items.splice(this.items.indexOf(text), 1);
        this.drawItems();
    }

    private addListeners(): void
    {
        this.dummyInput.addEventListener("change", this.changeListener, false);
    }

    private removeListeners(): void
    {
        this.dummyInput.removeEventListener("change", this.changeListener);
    }

    public dispose(): void
    {
        while (this.items.length)
        {
            this.removeTab(this.items[0]);
        }
        this.removeListeners();
        this._element.parentElement.removeChild(this.container);
        this._element.style.display = this._elementDisplayValue; // Revert to cached value
    }

    public get element(): HTMLInputElement { return this._element; }
    public get settings(): BSSettings { return this._settings; }
}
