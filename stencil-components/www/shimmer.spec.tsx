import { newSpecPage } from "@stencil/core/testing";
import { Shimmer } from "./shimmer";

describe("shimmer-component", () => {
  it("renders with default props", async () => {
    const page = await newSpecPage({
      components: [Shimmer],
      html: "<shimmer-component></shimmer-component>",
    });

    const container = page.root.querySelector('[data-testid="shimmer-container"]') as HTMLElement;
    expect(container).toBeTruthy();
    expect(container.style.height).toBe("100%");
    expect(container.style.width).toBe("100%");

    const animation = container.querySelector('[data-testid="shimmer-animation"]');
    expect(animation).toBeTruthy();
    expect(animation.className).toContain("animate-[shimmer_2s_infinite]");
  });

  it("renders with custom dimensions", async () => {
    const page = await newSpecPage({
      components: [Shimmer],
      html: "<shimmer-component height='200px' width='300px'></shimmer-component>",
    });

    const container = page.root.querySelector('[data-testid="shimmer-container"]') as HTMLElement;
    expect(container).toBeTruthy();
    expect(container.style.height).toBe("200px");
    expect(container.style.width).toBe("300px");
  });

  it("has correct animation classes", async () => {
    const page = await newSpecPage({
      components: [Shimmer],
      html: "<shimmer-component></shimmer-component>",
    });

    const container = page.root.querySelector('[data-testid="shimmer-container"]') as HTMLElement;
    expect(container.className).toContain("bg-gradient-to-r");
    expect(container.className).toContain("from-gray-200");
    expect(container.className).toContain("via-gray-100");
    expect(container.className).toContain("to-gray-200");
    expect(container.className).toContain("rounded");

    const animation = container.querySelector('[data-testid="shimmer-animation"]');
    expect(animation.className).toContain("bg-gradient-to-r");
    expect(animation.className).toContain("from-transparent");
    expect(animation.className).toContain("via-white");
    expect(animation.className).toContain("to-transparent");
  });
}); 