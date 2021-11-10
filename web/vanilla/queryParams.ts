type ObjectLiteral<T = string | number | boolean | ObjectLiteral<any> | any[]> = {
    [key: string]: T
}

type QueryParamsReturn<T> = {
    get: () => ObjectLiteral<string>
    set: (object: T) => void
}

export function queryParams<T extends ObjectLiteral> (): QueryParamsReturn<T> {
    function get (): ObjectLiteral<string> {
        return Object.fromEntries(new URLSearchParams(window.location.search))
    }

    function set (object: T): void {
        const queryObject: ObjectLiteral<string> = {}

        Object.entries(object).forEach(([key, value]) => {
            if (value || value === false) {
                queryObject[key] = String(value)
            }
        })

        const queryString = new URLSearchParams(queryObject).toString()

        history.pushState({}, null, window.location.pathname + '?' + queryString)
        // or window.location.search = queryString
    }

    return {
        get,
        set
    }
}