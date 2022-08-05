const timer = (selector, deadLine) => {
    const getTimeRemaining = (endtime) => {
        let days, hours, minutes, seconds
        const t = Date.parse(endtime) - new Date()

        if (t < 0) {
            days = hours = minutes = seconds = '0'
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24))
            hours = Math.floor((t / (1000 * 60 * 60) % 24))
            minutes = Math.floor((t / (1000 * 60) % 60))
            seconds = Math.floor((t / 1000) % 60)
        }

        return {
            days,
            hours,
            minutes,
            seconds,
            total: t,
        }
    }

    const getZero = (num) => {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num
        }
    }

    const setTimer = (selector, endtime) => {
        let timeInterval
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds')

        const updateClock = () => {
            const t = getTimeRemaining(endtime)

            days.innerHTML = getZero(t.days)
            hours.innerHTML = getZero(t.hours)
            minutes.innerHTML = getZero(t.minutes)
            seconds.innerHTML = getZero(t.seconds)

            if (t.total <= 0) clearInterval(timeInterval)
        }
        updateClock()

        timeInterval = setInterval(updateClock, 1000)
    }
    setTimer(selector, deadLine)
}

export default timer