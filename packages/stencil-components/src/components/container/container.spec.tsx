import { newSpecPage } from "@stencil/core/testing";
import { Container } from "./container";

describe("container-component", () => {
  it("renders with default styles", async () => {
    const page = await newSpecPage({
      components: [Container],
      html: "<container-component></container-component>",
    });

    const container = page.root.querySelector('[data-testid="container"]');
    expect(container).toBeTruthy();
    expect(container.className).toContain("flex");
    expect(container.className).toContain("flex-col");
    expect(container.className).toContain("w-full");
    expect(container.className).toContain("bg-white");
    expect(container.className).toContain("shadow-2xl");
  });

  it("renders slot content", async () => {
    const page = await newSpecPage({
      components: [Container],
      html: "<container-component><div>Test Content</div></container-component>",
    });

    const container = page.root.querySelector('[data-testid="container"]');
    expect(container).toBeTruthy();
    expect(container.innerHTML).toContain("<div>Test Content</div>");
  });

  it("applies responsive styles", async () => {
    const page = await newSpecPage({
      components: [Container],
      html: "<container-component></container-component>",
    });

    const container = page.root.querySelector('[data-testid="container"]');
    expect(container).toBeTruthy();
    expect(container.className).toContain("md:w-[600px]");
    expect(container.className).toContain("md:min-w-[600px]");
  });
}); 