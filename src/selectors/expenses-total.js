export default (expenses) => {
    const amountArr = expenses.map((expense) => expense.amount);
    const amountTotal = amountArr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return amountTotal
}