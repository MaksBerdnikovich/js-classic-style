const accordion = (triggersSelector, itemsSelector) => {
    const btns = document.querySelectorAll(triggersSelector)
    const items = document.querySelectorAll(itemsSelector)

    items.forEach(item => {
        item.classList.add('animate__animated', 'animate__flipInX')
    })

    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.currentTarget

            if (!target.classList.contains('active')) {
                btns.forEach(btn => {
                    btn.classList.remove('active')
                })
                target.classList.add('active')
            }
        })
    })
}

export default accordion