const scrolling = (offsetSelector, linkSelector, speedParam) => {
    let links = document.querySelectorAll(linkSelector),
        offsetEl = document.querySelector(offsetSelector),
        offset = offsetEl.offsetHeight + offsetEl.offsetTop,
        speed = speedParam

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault()

            const self = e.target

            let widthTop = document.documentElement.scrollTop,
                hash = self.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top,
                start = null

            const frame = (time) => {
                if (start === null) start = time

                let progress = time - start,
                    y = (toBlock < 0
                        ? Math.max(widthTop - progress / speed, widthTop + toBlock)
                        : Math.min(widthTop + progress / speed, widthTop + toBlock)
                    )

                document.documentElement.scrollTo(0, y - offset)

                if (y !== (widthTop + toBlock)) {
                    requestAnimationFrame(frame)
                } else {
                    //location.hash = ''
                }
            }

            requestAnimationFrame(frame)
        })
    })
}

export default scrolling