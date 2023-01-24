function patchParseNewValues<T>(
    baseObject: T,
    newValues: Partial<T>
): Partial<T> {
    let changedValues: Partial<T> = {}

    for (const key in newValues) {
        if (newValues[key] !== baseObject[key]) changedValues[key] = newValues[key]
    }

    return changedValues
}

export default patchParseNewValues