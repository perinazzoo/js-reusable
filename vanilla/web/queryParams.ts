type ObjectLiteral<T> = {
    [key: string]: T
}

type QueryParamsReturn = {
    get: () => ObjectLiteral<string>,
    set: (object: ObjectLiteral<string | number | boolean>) => void
}

export function queryParams (): QueryParamsReturn {
    function get () {
        return Object.fromEntries(new URLSearchParams(window.location.search))
    }

    function set (object: ObjectLiteral<string | number | boolean>) {
        const queryObject = {}

        Object.entries(object).forEach(([key, value]) => {
            if (![undefined, null].includes(value)) {
                queryObject[key] = value
            }
        })

        const queryString = new URLSearchParams(queryObject).toString()

        history.pushState({}, null, window.location.pathname + '?' + queryString)
    }

    return {
        get,
        set
    }
}
