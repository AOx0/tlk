def check_digit(bin_format):
    digit = ''
    for i in reversed(range(16)):
        if bin_format[i] != 'x':
            pass
        elif bin_format[i] == 'x':
            digit = i
            break

    return digit

check_digit("1234")