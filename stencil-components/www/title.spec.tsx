import { newSpecPage } from "@stencil/core/testing";
import { Title } from "./title";

describe("title-component", () => {
    it("renders with text prop", async () => {
        const page = await newSpecPage({
            components: [Title],
            html: '<title-component text="Hello World"></title-component>',
        });
        expect(page.root).toMatchSnapshot();
        const h1 = page.root.shadowRoot.querySelector("h1");
        expect(h1.className).toContain("font-bold");
        expect(h1.className).toContain("text-[18px]");
        expect(h1.className).toContain("text-primary");
        expect(h1.textContent).toBe("Hello World");
    });

    it("renders with empty text", async () => {
        const page = await newSpecPage({
            components: [Title],
            html: '<title-component text=""></title-component>',
        });
        expect(page.root).toMatchSnapshot();
        const h1 = page.root.shadowRoot.querySelector("h1");
        expect(h1.className).toContain("font-bold");
        expect(h1.className).toContain("text-[18px]");
        expect(h1.className).toContain("text-primary");
        expect(h1.textContent).toBe("");
    });
});
