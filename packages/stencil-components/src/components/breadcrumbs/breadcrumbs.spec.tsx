import { newSpecPage } from "@stencil/core/testing";
import { Breadcrumbs } from "./breadcrumbs";

describe("breadcrumbs-component", () => {
  const mockItems = ["Home", "Products", "Category", "Product Name"];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders breadcrumbs with items", async () => {
    const page = await newSpecPage({
      components: [Breadcrumbs],
      html: "<breadcrumbs-component></breadcrumbs-component>",
    });

    page.root.items = mockItems;
    await page.waitForChanges();

    const breadcrumbs = page.root.shadowRoot.querySelector('[data-testid="breadcrumbs"]');
    expect(breadcrumbs).toBeTruthy();

    mockItems.forEach((item, index) => {
      const breadcrumbItem = breadcrumbs.querySelector(`[data-testid="breadcrumb-item-${index}"]`);
      expect(breadcrumbItem).toBeTruthy();

      const link = breadcrumbItem.querySelector(`[data-testid="breadcrumb-link-${index}"]`);
      expect(link).toBeTruthy();
      expect(link.textContent).toBe(item);

      if (index > 0) {
        const separator = breadcrumbItem.querySelector(`[data-testid="breadcrumb-separator-${index}"]`);
        expect(separator).toBeTruthy();
        expect(separator.textContent).toBe("/");
      }
    });
  });

  it("applies correct styles to last item", async () => {
    const page = await newSpecPage({
      components: [Breadcrumbs],
      html: "<breadcrumbs-component></breadcrumbs-component>",
    });

    page.root.items = mockItems;
    await page.waitForChanges();

    const lastItem = page.root.shadowRoot.querySelector('[data-testid="breadcrumb-link-3"]');
    expect(lastItem.className).toContain("text-text");
    expect(lastItem.className).toContain("cursor-default");
    expect(lastItem.className).not.toContain("text-label-gray");
    expect(lastItem.className).not.toContain("underline");
  });

  it("applies correct styles to non-last items", async () => {
    const page = await newSpecPage({
      components: [Breadcrumbs],
      html: "<breadcrumbs-component></breadcrumbs-component>",
    });

    page.root.items = mockItems;
    await page.waitForChanges();

    const firstItem = page.root.shadowRoot.querySelector('[data-testid="breadcrumb-link-0"]');
    expect(firstItem.className).toContain("text-label-gray");
    expect(firstItem.className).toContain("underline");
    expect(firstItem.className).toContain("cursor-pointer");
    expect(firstItem.className).not.toContain("text-text");
  });

  it("emits routeClick event when non-last item is clicked", async () => {
    const page = await newSpecPage({
      components: [Breadcrumbs],
      html: "<breadcrumbs-component></breadcrumbs-component>",
    });

    page.root.items = mockItems;
    await page.waitForChanges();

    const eventSpy = jest.fn();
    page.root.addEventListener("routeClick", eventSpy);

    const firstItem = page.root.shadowRoot.querySelector('[data-testid="breadcrumb-link-0"]') as HTMLElement;
    firstItem.click();
    await page.waitForChanges();

    expect(eventSpy).toHaveBeenCalledWith(expect.objectContaining({
      detail: "Home"
    }));
  });

  it("does not emit routeClick event when last item is clicked", async () => {
    const page = await newSpecPage({
      components: [Breadcrumbs],
      html: "<breadcrumbs-component></breadcrumbs-component>",
    });

    page.root.items = mockItems;
    await page.waitForChanges();

    const eventSpy = jest.fn();
    page.root.addEventListener("routeClick", eventSpy);

    const lastItem = page.root.shadowRoot.querySelector('[data-testid="breadcrumb-link-3"]') as HTMLElement;
    lastItem.click();
    await page.waitForChanges();

    expect(eventSpy).not.toHaveBeenCalled();
  });
}); 