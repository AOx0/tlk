### ccgen.py
### Extensión parte del Bot de Telegram "Sofía @Sofi3PBot"
### Created by Alejandro D on 2017.
### Copyright © 2020 Alejandro D. All rights reserved.
### Written with Python 3.8

import datetime
import sys
from random import randint


def luhn(card_number):
    num = list(map(int, str(card_number)))
    return sum(
        num[::-2] + [sum(divmod(d * 2, 10)) for d in num[-2::-2]]
                            ) % 10 == 0


def ccvgen():
    cvv = randint(10, 999)
    if cvv < 100:
        cvv = "0" + str(cvv)
    else:
        cvv = str(cvv)

    return cvv


def dategen():
    now = datetime.datetime.now()
    month = str(randint(1, 12))
    month = f'0{month}' if int(month) < 10 else month
    current_year = str(now.year)
    year = f'20{str(randint(int(current_year[-2:]) + 1, int(current_year[-2:]) + 6))}'
    date = month + "|" + year

    return date


def check_digit(bin_format):
    digit = ''
    for i in reversed(range(16)):
        if bin_format[i] != 'x':
            pass
        elif bin_format[i] == 'x':
            digit = i
            break

    return digit


def generar(iin, generar_fecha=1, generar_cvv=1):
    output = ''
    if len(iin) == 16:
        digit = check_digit(iin)
        for i in range(16):
            if iin[i] in ("0", "1", "2", "3", "4", "5", "6", "7", "8", "9"):
                output = output + iin[i]
                continue
            elif iin[i] in "x" and i != digit:
                output = output + str(randint(0, 9))

        for i in range(10):
            valido = list(output)
            valido.insert(digit, str(i))
            valido = ''.join(valido)

            if luhn(valido) is True:
                output = valido
                break

    if luhn(output) is True:
        cvv = ccvgen() if generar_cvv == 1 else ""
        date = dategen() if generar_fecha == 1 else ""

        output = (output + '|' + date + '|' + cvv) if generar_fecha == 1 and generar_cvv == 1 else output
        output = (output + '|' + date) if generar_fecha == 1 and generar_cvv == 0 else output
        output = (output + '|' + cvv) if generar_fecha == 0 and generar_cvv == 1 else output

        return output
    else:
        output = 'Bin invalido'
        return output


def main(texto):
    texto_listed = list(texto)
    iin = ''.join(texto_listed[0:16])
    if len(texto) == 20:
        texto_listed.remove(' ')
        texto_listed.remove(' ')
        fecha = int(texto_listed[16])
        cvv = int(texto_listed[17])
        output = generar(iin, fecha, cvv)
    elif len(texto) == 22:
        texto_listed.remove(' ')
        texto_listed.remove(' ')
        texto_listed.remove(' ')
        fecha = int(texto_listed[16])
        cvv = int(texto_listed[17])
        output = ''
        for i in range(int(texto_listed[18])):
            cc = generar(iin, fecha, cvv)
            output = output + f'{cc}\n'
    elif len(texto) == 16:
        output = generar(iin)
    else:
        return "Error"

    return output


print(main(f"{sys.argv[1]} 1 1 3"))
