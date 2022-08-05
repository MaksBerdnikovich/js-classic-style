import {getData} from "../services/requests";
import {modals, modalsByCalc} from "./modals";

const loadMoreProducts = (trigger, wrapper, elements, offset = 6) => {
    const btn = document.querySelector(trigger)

    const createCards = (response) => {
        response.forEach(({src, title, text, mark}) => {
            let card = document.createElement('div')
            card.classList.add('item', 'all', 'col-lg-4', 'animate__animated', 'animate__flipInX', mark)
            card.innerHTML = `
                <a href="javascript:void(0)" class="expertises-item">
                    <img src="${src}" alt="${title}" class="box-shadow img-fluid">
                    <h6 class="mt-3 mb-2">${title}</h6>
                    <p class="xs-font">${text}</p>
                </a>
            `;

            document.querySelector(wrapper).append(card)
        })

        modalsByCalc( 'showModalByCalc', elements)
    }

    getData('db.json')
        .then(res => createCards(res.products.slice(0, offset)))
        .catch(error => console.log(error))

    btn.addEventListener('click', (e) => {
        const targetParent = e.target.parentElement
        const itemsCount = document.querySelectorAll(elements).length

        getData('db.json')
            .then(res => {
                const data = res.products
                createCards(data.slice(itemsCount, itemsCount + offset))

                if (itemsCount + offset >= data.length) {
                    targetParent.remove()
                }
            })
            .catch(error => console.log(error))
    })
}

const filtersProducts = (trigger, elements) => {
    const btns = document.querySelectorAll(trigger)

    const activeBtn = (target) => {
        btns.forEach(btn => {
            btn.classList.add('btn-outline-primary')
            btn.classList.remove('btn-primary')
        })

        target.classList.add('btn-primary')
        target.classList.remove('btn-outline-primary')
    }

    const hideElements = (items) => {
        items.forEach(item => {
            item.style.display = 'none'
            item.classList.remove('animate__animated', 'animate__flipInX')
        })
    }

    const showElements = (items) => {
        if (items) {
            items.forEach(item => {
                item.style.display = 'block'
                setTimeout(() => {
                    item.classList.add('animate__animated', 'animate__flipInX')
                })
            })
        }
    }

    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.target
            const mark = e.target.getAttribute('data-filter')
            const list = document.querySelectorAll(mark)
            const items = document.querySelectorAll(elements)

            activeBtn(target)

            hideElements(items)

            showElements(list)
        })
    })
}

export {loadMoreProducts, filtersProducts}