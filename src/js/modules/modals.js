import {lockBodyScroll, unlockBodyScroll} from "../services/helpers";

const helper = {
    timeout: 300,
    btnPressed: false,

    initOverlay() {
        const overlay = document.createElement('div')
        overlay.classList.add('modal-backdrop', 'fade')
        document.body.append(overlay)

        setTimeout(() => {
            overlay.classList.add('show')
            lockBodyScroll()
        }, Math.round(this.timeout / 2))
    },

    removeOverlay() {
        document.querySelector('.modal-backdrop').remove()
        unlockBodyScroll()
    },

    showModal (targetModal) {
        this.initOverlay()

        setTimeout(() => {
            targetModal.style.display = 'block'
            targetModal.classList.add('show')
        }, this.timeout)
    },

    hideModal (targetModal) {
        targetModal.classList.remove('show')
        targetModal.style.display = 'none'

        this.removeOverlay()
    }
}

const modals = (triggerSelector, modalSelector, closeSelector) => {
    const triggers = document.querySelectorAll(triggerSelector)
    const modals = document.querySelectorAll(modalSelector)
    const closes = document.querySelectorAll(closeSelector)

    triggers.forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target) e.preventDefault()
            helper.btnPressed = true

            const triggerId = item.getAttribute('data-modal-target')
            const targetModal = document.querySelector(`[data-modal = "${triggerId}"]`)

            if (targetModal !== null && targetModal !== undefined) {
                helper.showModal(targetModal)
            }
        })
    })

    closes.forEach(item => {
        item.addEventListener('click', (e) => {
            const targetModal = e.target.closest("[data-modal]");
            helper.btnPressed = true
            helper.hideModal(targetModal)
        })
    })

    modals.forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target === item){
                helper.btnPressed = true
                helper.hideModal(item)
            }
        })
    })
}

const modalsByTime = (selector, time) => {
    setTimeout(() => {
        let display

        document.querySelectorAll('[data-modal]').forEach(item => {
            if (getComputedStyle(item).display !== 'none'){
                display = 'block'
            }
        })

        if (!display){
            const modal = document.querySelector(`[data-modal = "${selector}"]`)
            helper.showModal(modal)
        }
    }, time)
}

const modalsByScroll = (selector) => {
    const modal = document.querySelector(`[data-modal = "${selector}"]`)

    window.addEventListener('scroll', () => {
        if ((window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) && !helper.btnPressed) {
            helper.showModal(modal)
            window.removeEventListener('scroll', modalsByScroll)
        }
    })
}

const modalsByCalc = (selector, triggers) => {
    const modal = document.querySelector(`[data-modal = "${selector}"]`)
    const btns = document.querySelectorAll(triggers)

    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            helper.showModal(modal)
        })
    })
}

export {modals, modalsByTime, modalsByScroll, modalsByCalc}