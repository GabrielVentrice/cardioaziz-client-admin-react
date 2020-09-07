export function NameShortener(fullName: string): string {
  if (fullName) {
    const array = fullName.toLocaleLowerCase().split(' ')

    let abreviateMiddle = ''

    for (let i = 1; i < array.length - 1; i++) {
      if (array[i].length > 2) {
        abreviateMiddle += `${array[i].charAt(0)}. `
      }
    }

    return `${array[0]} ${abreviateMiddle} ${array[array.length - 1]}`
  }

  return ''
}
