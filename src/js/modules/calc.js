const calc = (sizeSelector, materialSelector, serviceSelector, promoSelector, resultSelector, errorSelector) => {
    const size = document.querySelector(sizeSelector)
    const material = document.querySelector(materialSelector)
    const service = document.querySelector(serviceSelector)
    const promo = document.querySelector(promoSelector)
    const result = document.querySelector(resultSelector)
    const error = document.querySelector(errorSelector)

    let sum = 0
    const calculate = () => {
        sum = Math.round((+size.value) * (+material.value) + (+service.value))
        error.value = ''

        if (promo.value === 'SALE30') {
            result.value = `$ ${Math.round(sum * 0.7)}`
        } else {
            result.value = `$ ${sum}`
        }
    }

    size.addEventListener('change', calculate)
    material.addEventListener('change', calculate)
    service.addEventListener('change', calculate)
    promo.addEventListener('input', calculate)
}

export default calc