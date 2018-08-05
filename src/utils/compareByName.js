export default (a,b) => {
    const aName = a.name.toUpperCase();
    const bName = b.name.toUpperCase();
    if (aName < bName) { return -1 };
    if (aName > bName) { return 1 };
    return 0;
}