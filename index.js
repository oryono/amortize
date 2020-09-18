import Finance from "financejs";
const finance = new Finance()


export function weeklyAmortizationSchedule(principal, interestRate, periodWeeks) {
    const rate = interestRate / 12 / 4 / 100;

    const numerator = rate * Math.pow((1 + rate), periodWeeks)
    const denominator = Math.pow((1 + rate), periodWeeks) - 1

    const amortization = principal * (numerator / denominator);
    const installment = Math.round(amortization * 100) / 100;

    let amortizationSchedule = [];
    for (let i = 0; i < periodWeeks; i++) {
        const prevPrincipal = i === 0 ? principal : amortizationSchedule[i-1].principalBalance;
        const interestPayment = prevPrincipal * rate;
        const principalPayment = installment - interestPayment;
        const principalBalance = Math.max(prevPrincipal - principalPayment, 0);
        const accInterest = (i === 0 ? 0 : amortizationSchedule[i-1].accInterest) + interestPayment;

        amortizationSchedule.push({
            paymentNumber: i+1,
            payment: installment,
            principalBalance: principalBalance,
            interestPayment: interestPayment,
            principalPayment: principalPayment,
            accInterest: accInterest
        });
    }

    return amortizationSchedule;
}

export function monthlyAmortization(principal, interestRate, periodMonths) {
    const installment = finance.AM(principal, interestRate, periodMonths, 1);
    const rate = interestRate / 12 / 100

    let amortizationSchedule = [];
    for (let i = 0; i < periodMonths; i++) {
        const prevPrincipal = i === 0 ? principal : amortizationSchedule[i-1].principalBalance;
        const interestPayment = prevPrincipal * rate;
        const principalPayment = installment - interestPayment;
        const principalBalance = Math.max(prevPrincipal - principalPayment, 0);
        const accInterest = (i === 0 ? 0 : amortizationSchedule[i-1].accInterest) + interestPayment;

        amortizationSchedule.push({
            paymentNumber: i+1,
            payment: installment,
            principalBalance: principalBalance,
            interestPayment: interestPayment,
            principalPayment: principalPayment,
            accInterest: accInterest
        });
    }

    return amortizationSchedule;
}
