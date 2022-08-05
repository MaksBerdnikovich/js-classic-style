const slider = (wrapperSelector, slideSelector, currSelector, totalSelector, navigate= true, dotes = true) => {
    const wrapper = document.querySelector(wrapperSelector),
        slides = document.querySelectorAll(slideSelector),
        current = document.querySelector(currSelector),
        total = document.querySelector(totalSelector),
        sliderLength = slides.length,
        slideCount = slides.length - 1
    let slideIndex = 0

    const setSliderNav = (index, length) => {
        index < 9 ? current.innerHTML = `0${index + 1}` : current.innerHTML = index + 1
        length < 10 ? total.innerHTML = `0${length}` : total.innerHTML = length
    }

    const initDots = () => {
        const dotsWrap = document.createElement('div')
        dotsWrap.classList.add(`${wrapperSelector.slice(1)}__dots`)
        wrapper.append(dotsWrap)

        for (let i = 0; i < sliderLength; i++) {
            const dot = document.createElement('div')
            dot.classList.add('dot')
            if (i === 0) dot.classList.add('active')

            dotsWrap.append(dot)
        }
    }
    if (dotes) initDots()

    const initNavigate = () => {
        const navWrap = document.createElement('div')
        navWrap.classList.add(`${wrapperSelector.slice(1)}__nav`)
        wrapper.append(navWrap)

        const prev = document.createElement('div')
        prev.classList.add('prev', 'ti-angle-left')

        const next = document.createElement('div')
        next.classList.add('next', 'ti-angle-right')

        navWrap.append(prev)
        navWrap.append(next)
    }
    if (navigate) initNavigate()

    const setDotsNav = (i) => {
        const dots = document.querySelectorAll(`${wrapperSelector}__dots .dot`)
        dots.forEach(dot => {
            dot.classList.remove('active')
        })
        dots[i].classList.add('active')
    }

    const rotateSlides = (i) => {
        slides.forEach(item => item.style.display = 'none')
        slides[i].style.display = ''

        setSliderNav(i, sliderLength)
        if (dotes) setDotsNav(i)
    }
    rotateSlides(slideIndex)

    if (dotes) {
        const dots = document.querySelectorAll(`${wrapperSelector}__dots .dot`)
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                slideIndex = i
                rotateSlides(slideIndex)
            })
        })
    }

    if (navigate) {
        const prev = document.querySelector(`${wrapperSelector}__nav .prev`)
        prev.addEventListener('click', () => {
            slideIndex = (slideIndex - 1) < 0 ? slideCount : slideIndex - 1
            rotateSlides(slideIndex)
        })

        const next = document.querySelector(`${wrapperSelector}__nav .next`)
        next.addEventListener('click', () => {
            slideIndex = (slideIndex + 1) > slideCount ? 0 : slideIndex + 1
            rotateSlides(slideIndex)
        })
    }
}

const sliderHero = (sliderSelector, sliderItemSelector, progressSelector, timeout = 10000, transition = 1) => {
    const overlayItems = document.querySelectorAll(sliderSelector)
    const sliderItems = document.querySelectorAll(sliderItemSelector)
    const progress = document.querySelector(progressSelector)
    let current = 0

    const rotateSlides = (i) => {
        overlayItems.forEach(item => item.classList.remove('active'))
        overlayItems[i].classList.add('active')

        sliderItems.forEach(item => item.classList.remove('active'))
        sliderItems[i].classList.add('active')
    }
    rotateSlides(current)

    const calcProgress = () => {
        let i = 0
        let timeInterval

        const updateClock = () => {
            progress.style.width = `${i+=transition}%`

            if (i > 100 + (100 / (timeout / 1000))) {
                if (current >= sliderItems.length - 1) {
                    current = 0
                } else {
                    current++
                }

                progress.style.width = `0`
                clearInterval(timeInterval)
                rotateSlides(current)
                calcProgress()
            }
        }
        progress.style.cssText = `transition: width ${transition}s linear;`
        timeInterval = setInterval(updateClock, timeout / 100)
    }
    calcProgress()
}

export {slider, sliderHero}