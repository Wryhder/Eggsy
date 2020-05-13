const topScope = Object.create(null);

topScope.true = true;
topScope.false = false;

for (let op of ["+", "*", "/", "==", "<", ">"]) {
    topScope[op] = Function("a, b", `return a ${op} b;`);
}

topScope.print = value => {
    console.log(value);
    return value;
};

topScope.array = (...values) => {
    return [...values];
}

topScope.length = array => {
    return array.length;
}

topScope.element = (array, n) => {
    return array[n];
}

export default topScope;