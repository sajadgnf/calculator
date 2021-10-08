class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText
        this.currentOperandText = currentOperandText
        this.clear()
    }

    clear() {
        this.previousOperand = ""
        this.currentOperand = ""
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumbers(number) {
        if (number === "." && this.currentOperand.includes(".")) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseoperation(oprator) {
        if (this.currentOperand === "") return
        if (this.previousOperand !== "") {
            this.compute()
        }
        this.operation = oprator
        this.previousOperand = this.currentOperand
        this.currentOperand = ""
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return

        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.previousOperand = ""
        this.operation = undefined

    }

    getDisplayNumber(number) {
        const stringNumbers = number.toString()
        const integerDigits = parseFloat(stringNumbers.split('.')[0])
        const decimalDigits = stringNumbers.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandText.innerHTML = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandText.innerHTML = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandText.innerHTML = ""
        }
    }
}

const $ = document

const previousOperandText = $.querySelector(".previous_operand")
const currentOperandText = $.querySelector(".current_operand")
const numberBtn = $.querySelectorAll("[data-number]")
const operationBtn = $.querySelectorAll("[data-operation]")
const deleteBtn = $.querySelector("[data-delete]")
const allClearBtn = $.querySelector("[data-all-clear]")
const equalsBtn = $.querySelector("[data-equal]")

const calculator = new Calculator(previousOperandText, currentOperandText)

numberBtn.forEach(item => {
    item.addEventListener("click", () => {
        calculator.appendNumbers(item.innerHTML)
        calculator.updateDisplay()
    })
})

operationBtn.forEach(item => {
    item.addEventListener("click", () => {
        calculator.chooseoperation(item.innerHTML)
        calculator.updateDisplay()
    })
})

deleteBtn.addEventListener("click", () => {
    calculator.delete()
    calculator.updateDisplay()
})

allClearBtn.addEventListener("click", () => {
    calculator.clear()
    calculator.updateDisplay()
})

equalsBtn.addEventListener("click", () => {
    calculator.compute()
    calculator.updateDisplay()
})