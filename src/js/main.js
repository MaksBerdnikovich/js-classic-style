import {modals, modalsByScroll, modalsByTime} from "./modules/modals";
import tabs from "./modules/tabs";
import timer from "./modules/timer";
import {slider, sliderHero} from "./modules/sliders";
import forms from "./modules/forms";
import {filtersProducts, loadMoreProducts} from "./modules/products";
import calc from "./modules/calc";
import accordion from "./modules/accordion";
import hamburger from "./modules/hamburger";
import scrolling from "./modules/scroll-to-anchore";

window.addEventListener('DOMContentLoaded', () => {
    'use strict'

    slider('.testmonial-carousel',
        '.testmonial-carousel .item',
        '.testmonial__current',
        '.testmonial__total',
    )
    sliderHero(
        '.overlay__image',
        '.carousel-item',
        '.progress-bar'
    )
    timer('.timer', '2023-07-17')
    tabs(
        '.tabs__nav-list',
        '.tabs__nav-item',
        'tabs__nav-item--active',
        '.tabs__content-item',
        'tabs__content-item--active'
    )
    loadMoreProducts(
        '#portfolio .load-more-btn',
        '#portfolio .products-section',
        '#portfolio .products-section .item'
    )
    filtersProducts(
        '#portfolio .filtered-products .btn',
        '#portfolio .products-section .item'
    )
    calc(
        '#sizeSelect',
        '#materialSelect',
        '#additionalServices',
        '#promoCode',
        '#calcResult',
        '#calcError'
    )
    accordion(
        '.accordion .accordion__head',
        '.accordion .accordion__body',
    )
    hamburger(
        '.navbar .navbar-toggler',
        '.navbar .navbar-collapse',
    )
    modals(
        '[data-modal-target]',
        '[data-modal]',
        '[data-dismiss="modal"]'
    )
    modalsByTime('showModalByTime', 60000)
    //modalsByScroll('showModalByScroll')
    scrolling('.navbar','.navbar-nav .nav-link', 0.3)
    forms()
})