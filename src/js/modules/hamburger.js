const hamburger = (triggerSelector, menuSelector) => {
    const btn = document.querySelector(triggerSelector)
    const menu = document.querySelector(menuSelector)

    menu.style.display = 'none'

    btn.addEventListener('click', () => {
        if (menu.style.display === 'none') {
            menu.classList.add('animate__lightSpeedInLeft')
            menu.style.display = 'block'
        } else {
            menu.style.display = 'none'
            menu.classList.remove('animate__lightSpeedInLeft')
        }
    })

    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            menu.style.display = 'none'
        }
    })
}

export default hamburger