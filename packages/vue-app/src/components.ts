/* eslint-disable */
/* tslint:disable */
/* auto-generated vue proxies */
import { defineContainer, type StencilVueComponent } from '@stencil/vue-output-target/runtime';

import type { JSX } from '@salla-assignment/stencil-components/dist/components';

import { defineCustomElement as defineAppComponent } from '@salla-assignment/stencil-components/dist/components/app-component.js';
import { defineCustomElement as defineBreadcrumbsComponent } from '@salla-assignment/stencil-components/dist/components/breadcrumbs-component.js';
import { defineCustomElement as defineButtonComponent } from '@salla-assignment/stencil-components/dist/components/button-component.js';
import { defineCustomElement as defineCartComponent } from '@salla-assignment/stencil-components/dist/components/cart-component.js';
import { defineCustomElement as defineCartItemComponent } from '@salla-assignment/stencil-components/dist/components/cart-item-component.js';
import { defineCustomElement as defineCartTotal } from '@salla-assignment/stencil-components/dist/components/cart-total.js';
import { defineCustomElement as defineCartViewComponent } from '@salla-assignment/stencil-components/dist/components/cart-view-component.js';
import { defineCustomElement as defineConfirmationViewComponent } from '@salla-assignment/stencil-components/dist/components/confirmation-view-component.js';
import { defineCustomElement as defineContainerComponent } from '@salla-assignment/stencil-components/dist/components/container-component.js';
import { defineCustomElement as defineCouponComponent } from '@salla-assignment/stencil-components/dist/components/coupon-component.js';
import { defineCustomElement as defineCouponInput } from '@salla-assignment/stencil-components/dist/components/coupon-input.js';
import { defineCustomElement as defineShimmerComponent } from '@salla-assignment/stencil-components/dist/components/shimmer-component.js';
import { defineCustomElement as defineShippingListComponent } from '@salla-assignment/stencil-components/dist/components/shipping-list-component.js';
import { defineCustomElement as defineShippingViewComponent } from '@salla-assignment/stencil-components/dist/components/shipping-view-component.js';
import { defineCustomElement as defineTitleComponent } from '@salla-assignment/stencil-components/dist/components/title-component.js';


export const AppComponent: StencilVueComponent<JSX.AppComponent> = /*@__PURE__*/ defineContainer<JSX.AppComponent>('app-component', defineAppComponent);


export const BreadcrumbsComponent: StencilVueComponent<JSX.BreadcrumbsComponent> = /*@__PURE__*/ defineContainer<JSX.BreadcrumbsComponent>('breadcrumbs-component', defineBreadcrumbsComponent, [
  'items',
  'routeClick'
], [
  'routeClick'
]);


export const ButtonComponent: StencilVueComponent<JSX.ButtonComponent> = /*@__PURE__*/ defineContainer<JSX.ButtonComponent>('button-component', defineButtonComponent, [
  'variant',
  'isDisabled',
  'isLoading',
  'showShimmer',
  'onClick'
], [
  'onClick'
]);


export const CartComponent: StencilVueComponent<JSX.CartComponent> = /*@__PURE__*/ defineContainer<JSX.CartComponent>('cart-component', defineCartComponent, [
  'items',
  'isLoading'
]);


export const CartItemComponent: StencilVueComponent<JSX.CartItemComponent> = /*@__PURE__*/ defineContainer<JSX.CartItemComponent>('cart-item-component', defineCartItemComponent, [
  'item'
]);


export const CartTotal: StencilVueComponent<JSX.CartTotal> = /*@__PURE__*/ defineContainer<JSX.CartTotal>('cart-total', defineCartTotal, [
  'isLoading',
  'showSimpleTotal'
]);


export const CartViewComponent: StencilVueComponent<JSX.CartViewComponent> = /*@__PURE__*/ defineContainer<JSX.CartViewComponent>('cart-view-component', defineCartViewComponent, [
  'navigate'
], [
  'navigate'
]);


export const ConfirmationViewComponent: StencilVueComponent<JSX.ConfirmationViewComponent> = /*@__PURE__*/ defineContainer<JSX.ConfirmationViewComponent>('confirmation-view-component', defineConfirmationViewComponent);


export const ContainerComponent: StencilVueComponent<JSX.ContainerComponent> = /*@__PURE__*/ defineContainer<JSX.ContainerComponent>('container-component', defineContainerComponent);


export const CouponComponent: StencilVueComponent<JSX.CouponComponent> = /*@__PURE__*/ defineContainer<JSX.CouponComponent>('coupon-component', defineCouponComponent, [
  'total',
  'coupon',
  'isLoading',
  'delete'
], [
  'delete'
]);


export const CouponInput: StencilVueComponent<JSX.CouponInput> = /*@__PURE__*/ defineContainer<JSX.CouponInput>('coupon-input', defineCouponInput, [
  'isLoading',
  'value',
  'placeholder',
  'disabled',
  'isCouponApplied',
  'applyCoupon',
  'inputChange'
], [
  'applyCoupon',
  'inputChange'
]);


export const ShimmerComponent: StencilVueComponent<JSX.ShimmerComponent> = /*@__PURE__*/ defineContainer<JSX.ShimmerComponent>('shimmer-component', defineShimmerComponent, [
  'height',
  'width'
]);


export const ShippingListComponent: StencilVueComponent<JSX.ShippingListComponent> = /*@__PURE__*/ defineContainer<JSX.ShippingListComponent>('shipping-list-component', defineShippingListComponent, [
  'shippingOptions',
  'isLoading',
  'shippingOptionSelected'
], [
  'shippingOptionSelected'
]);


export const ShippingViewComponent: StencilVueComponent<JSX.ShippingViewComponent> = /*@__PURE__*/ defineContainer<JSX.ShippingViewComponent>('shipping-view-component', defineShippingViewComponent, [
  'navigate'
], [
  'navigate'
]);


export const TitleComponent: StencilVueComponent<JSX.TitleComponent> = /*@__PURE__*/ defineContainer<JSX.TitleComponent>('title-component', defineTitleComponent, [
  'text'
]);

