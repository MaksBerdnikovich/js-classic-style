const tabs = (navWrapper, navSelector, navClassActive, tabSelector, tabClassActive) => {
    const navigate = document.querySelector(navWrapper)
    const navs = document.querySelectorAll(navSelector)
    const tabs = document.querySelectorAll(tabSelector)

    const hideTabContent = () => {
        navs.forEach(item => {
            item.classList.remove(navClassActive)
        })

        tabs.forEach(item => {
            item.classList.remove(tabClassActive)
        })
    }
    hideTabContent()

    const showTabContent = (i = 0) => {
        navs[i].classList.add(navClassActive)
        tabs[i].classList.add(tabClassActive)
    }
    showTabContent()

    navigate.addEventListener('click', (e) => {
        const target = e.target

        if (target && target.matches(navSelector)) {
            navs.forEach((item, i) => {
                if (target === item) {
                    hideTabContent()
                    showTabContent(i)
                }
            })
        }
    })
}

export default tabs