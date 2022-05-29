addEventListener('message', e => {
    const { data } = e
    console.log("GOTS", data)
    if (data && typeof data == 'number') {
        return postMessage(data*data)
    } else {
        return postMessage(10)
    }
})

console.log("HKDJKDHKJSHKS")

export default {}
