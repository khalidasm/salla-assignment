import { newSpecPage } from '@stencil/core/testing';
import { Button } from './button';

describe('button-component', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<button-component>Click me</button-component>',
    });
    expect(page.root).toMatchSnapshot();
  });

  it('renders with small variant', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<button-component variant="sm">Small Button</button-component>',
    });
    expect(page.root).toMatchSnapshot();
    const button = page.root.shadowRoot.querySelector('button');
    expect(button.className).toContain('h-fit');
    expect(button.className).toContain('text-[10px]');
    expect(button.className).toContain('p-[7px]');
  });

  it('renders with icon variant', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<button-component variant="icon">Icon</button-component>',
    });
    expect(page.root).toMatchSnapshot();
  });

  it('renders in disabled state', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<button-component is-disabled>Disabled</button-component>',
    });
    expect(page.root).toMatchSnapshot();
    const button = page.root.shadowRoot.querySelector('button');
    expect(button.className).toContain('disabled');
  });

  it('renders in loading state', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<button-component is-loading>Loading</button-component>',
    });
    expect(page.root).toMatchSnapshot();
  });

  it('renders with shimmer', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<button-component show-shimmer>Shimmer</button-component>',
    });
    expect(page.root).toMatchSnapshot();
  });

  it('emits click events', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<button-component>Click me</button-component>',
    });

    const onClickSpy = jest.fn();
    page.root.addEventListener('onClick', onClickSpy);

    const button = page.root.shadowRoot.querySelector('button');
    button.click();

    expect(onClickSpy).toHaveBeenCalled();
  });
}); 