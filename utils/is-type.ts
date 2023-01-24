function isType<T>(object: any, data: (keyof T)[]): object is T {
    const keys = Object.keys(object)
    return keys.every((key) => key in data)
}

export default isType