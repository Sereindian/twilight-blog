class WebsiteDirectory extends HTMLElement {
        connectedCallback() {
            const input = this.querySelector<HTMLInputElement>("input");
            const count = this.querySelector("[data-count]");
            const empty = this.querySelector<HTMLElement>("[data-empty]");
            const groups = this.querySelectorAll<HTMLElement>("[data-group]");
            if (!input || !count || !empty) return;
            this.querySelector<HTMLElement>("[data-search-controls]")!.hidden = false;

            const filter = () => {
                const query = input.value.trim().toLocaleLowerCase();
                let total = 0;
                groups.forEach(group => {
                    let visible = 0;
                    group.querySelectorAll<HTMLAnchorElement>("[data-website]").forEach(link => {
                        link.hidden = !(link.dataset.search || "").includes(query);
                        if (!link.hidden) visible++;
                    });
                    group.hidden = visible === 0;
                    total += visible;
                });
                count.textContent = query ? `找到 ${total} 个网站` : `共 ${total} 个网站`;
                empty.hidden = total > 0;
            };
            input.oninput = filter;
            filter();
        }
    }
    if (!customElements.get("website-directory")) customElements.define("website-directory", WebsiteDirectory);
