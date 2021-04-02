class CCGen {

    static divmod(x, y) {
        return [ x % y, Math.floor(x / y)]
    }

    static list(string, charAction = i => { return i }) {
        let arr = []
        Array.prototype.forEach.call(string, char => { arr.push(charAction(char)) })
        return arr
    }

    static luhnCheck(card) {
        let num = []
        let num2 = []
        let num3 = []
        let sum = 0;

        num = this.list(card, char => { return Number(char) })
        num = [].concat(num).reverse()

        for (var i = 0; i<num.length; i=i+2) { num2.push(num[i]) }
        for (var i = 1; i<num.length; i=i+2) { num3.push(num[i]) }

        num3.forEach(d => { const qr = this.divmod(d*2, 10); num2.push(qr[0] + qr[1]); })
        num2.forEach(digit => { sum += digit })

        return sum % 10 === 0
    }

    static rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static cvvGen() {
        return String(this.rand(999,100))
    }

    static fvGen() {
        var month = this.rand(1, 12)
        String(month).length < 2 ? month = `0${month}` : month = `${month}`
        return {
            year: String(new Date().getFullYear() + this.rand(2, 5)),
            month: month
        }
    }

    static fixBinFormat(bin) {
        var bin = bin.toLowerCase()
        if (!/^[\dx]*$/.test(bin)) { return -1 }
        while (bin.length < 16) { bin += "x" }
        while (bin.length > 16) { bin = bin.slice(0, -1)}

        document.getElementById("cc").value = bin

        return bin
    }

    static genLastDigit(preResult) {
        var inProd = preResult
        for (var i = 0; i < 10; i++) {
            inProd = preResult.replace("x", String(i))
            if (this.luhnCheck(inProd)) { break }
        }
        return inProd
    }

    static genCC(bin) {
        var result = ""
        var xInBin = (bin.match(/x/g) || []).length

        Array.prototype.forEach.call(bin, char => {
            if (/\d/.test(char)) { result += char }
            else {
                if (xInBin > 1) { result += String(this.rand(0,9)); xInBin -= 1}
                else { result += char }
            }
        })

        return  this.genLastDigit(result)
    }

    static fixCVV(cvv) {
        var cvv = String(cvv)
        if (cvv.length === 3) {return cvv}
        else if (cvv.length === 2) {return `0${cvv}`}
        else if (cvv.length === 1) {return `00${cvv}`}
    }

    static run(bin, times = 1, year = "rnd", month= "rnd", CVV = "rnd", formatting = results => { return results }) {
        if (bin.length === 0) { return [] }
        var bin = this.fixBinFormat(bin)
        if (bin === -1) { return [] }
        var results = []

        for (var i = 1; i < times+1; i++) {
            var date = this.fvGen()
            results.push({
                month: month === "rnd" ? date.month : month,
                year: year === "rnd" ? date.year : year,
                cvv: CVV === "rnd" ? this.cvvGen() : this.fixCVV(CVV),
                cc: this.genCC(bin)
            })
        }

        return formatting(results)
    }

    static generate(config) {
        return this.run(config.bin, config.times, config.year, config.month, config.cvv, config.formatting)
    }

}

class CCGenFormatting {
    static checker(ccs) {
        var results = ""
        ccs.forEach(cc => {
            results += `${cc.cc}|${cc.month}|${cc.year}|${cc.cvv}\n`
        })
        return results
    }
}

function sumbitCVV() {
    if (/\d\d\d/.test(document.getElementById("cvv").value) || document.getElementById("cvv").value === "rnd")  {
        return 1
    } else {
        document.getElementById("cvv").value = "rnd"
        return -1
    }
}

function generateCCs() {
    if (sumbitCVV() === -1) {
        return
    }
    var fvMonth, fvYear, cvv;
    fvMonth = document.getElementById("month").value === "rnd" ? undefined : document.getElementById("month").value
    fvYear = document.getElementById("year").value === "rnd" ? undefined : document.getElementById("year").value
    cvv = document.getElementById("cvv").value === "rnd" ? undefined : document.getElementById("cvv").value
    console.log(fvMonth, fvYear, cvv)
    document.getElementById("r").innerHTML = CCGen.generate({
        bin: document.getElementById("cc").value,
        month: fvMonth,
        year: fvYear,
        cvv: cvv,
        times: Number(document.getElementById("cantidad").value),
        formatting: CCGenFormatting.checker
    })


}



