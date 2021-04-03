class Extrapolador {
    static _from(array, startIndex = 0, endIndex = array.length, step = 1, returnAsString = typeof array === "string") {
        /* Exclusive (endIndex) 'form' method. iform("asbcdefg", 0, 1) returns ['a'] */
        if (step === 0) { return }
        var result = [];
        if (step < 0) {
            console.log()
            for (let i = endIndex-1 ; i >= startIndex; i += step) {
                result.push(array[i])
            }
        } else if (step > 0) {
            for (let i = startIndex; i < endIndex; i += step) {
                result.push(array[i])
            }
        }

        if (returnAsString) { return result.join('') }
        else { return result }

    }

    static from(array, config = {}) {
        return this._from(array, config.start, config.end, config.step, config.asString)
    }

    static method1(cc1, cc2) {
        var group1 = this.from(cc1, {start: 0, end: 8})
        var group4 = this.from(cc2, {start: 8, end: 16})
        var dil = "";

        for (let i in [0,1,2,3,4,5,6,7]) {
            dil += String(Number(group1[i]) * Number(group4[i]))
        }

        var ccr = `${group1}${this.from(dil, {end: 8})}`
        console.log(ccr)
        return this.method3(ccr, cc1)
    }

    static method2(cc1, cc2) {
        var ccf_1 = (((Number(cc1[9]) + Number(cc2[9])) / 2) * 5)
        var ccf_2 = (((Number(cc1[10]) + Number(cc2[10])) / 2) * 5)
        var result = String(this.from(cc1, {start: 0, end: 8})) + String(Number(ccf_1) + Number(ccf_2))
        while (result.length < 16) { result += 'x'}
        return result
    }

    static method3(cc1, cc2) {
        var result = ""
        for (let i = 0; i < 16; i++) {
            if (i === 15 && result[14] === 'x' && cc1[i] !== cc2[i]) {
                result += '1'
                return result
            }

            if (cc1[i] !== cc2[i]) { result += 'x' }
            else { result += cc1[i] }
        }
        return result
    }
}

function genetareExtra() {
    var cc1 = document.getElementById("cc1")
    var cc2 = document.getElementById("cc2")

    if (!/^[\d]*$/.test(cc1.value) || cc1.value.length !== 16 ) { cc1.value = ""; return }
    if (!/^[\d]*$/.test(cc2.value) || cc2.value.length !== 16 ) { cc2.value = ""; return }

    cc1 = cc1.value
    cc2 = cc2.value

    const metodos = [Extrapolador.method1, Extrapolador.method2, Extrapolador.method3]
    var extrapolados = ""

    metodos.forEach(metodo => { extrapolados += `${metodo.call(Extrapolador, cc1, cc2)}\n` })
    document.getElementById("r").innerHTML = extrapolados
}