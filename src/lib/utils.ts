export function randomNumber(from: number, to: number) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

