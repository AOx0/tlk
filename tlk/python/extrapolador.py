import sys


def extra_a(cc1, cc2):
    group_1 = cc1[0:8]
    credit_1 = cc1[:]

    group_4 = cc2[8:16]
    dil = ''
    for i in range(8):
        dil = dil + '{}'.format(int(group_1[i]) * int(group_4[i]))
    for i in [dil]:
        extra_1 = i[0:8]

    ccr = str(group_1) + str(extra_1)
    ccfg = []
    for i in range(16):
        if ccr[i] != credit_1[i]:
            ccfg.append('x')
        else:
            ccfg.append(str(ccr[i]))

        if i == 16:
            if ccr[15] == 'x':
                ccfg.append('1')

    ccfg = ''.join(ccfg)

    return ccfg


def extra_b(cc1, cc2):
    ccf_1 = (((int(cc1[9]) + int(cc2[9])) / 2) * 5)
    ccf_2 = (((int(cc1[10]) + int(cc2[10])) / 2) * 5)
    ccfg = str(cc1[0:8]) + str(int(ccf_1) + int(ccf_2)) + 'xxxxxxx'

    return ccfg


def extra_c(cc1, cc2):
    credit_1 = cc1[:]
    ccr = cc2[:]

    ccfg = []
    for i in range(16):
        if ccr[i] != credit_1[i]:
            ccfg.append('x')
        else:
            ccfg.append(str(ccr[i]))

        if i == 16:
            if ccr[15] == 'x':
                ccfg.append('1')

    ccfg = ''.join(ccfg)
    return ccfg


def extrapolar(ccs):
    cc1 = list(ccs)
    cc2 = list(ccs)

    del cc1[0:17]
    cc2 = cc2[0:16]

    cc1 = ''.join(cc1)
    cc2 = ''.join(cc2)

    cc_final1 = extra_a(cc1, cc2)
    cc_final2 = extra_b(cc1, cc2)
    cc_final3 = extra_c(cc1, cc2)

    texto_final_mensaje = '{}\n{}\n{}'.format(cc_final1, cc_final2, cc_final3)
    return texto_final_mensaje

try:
    print(extrapolar(f'{sys.argv[1]} {sys.argv[2]}'))
except IndexError:
    print("Error")
