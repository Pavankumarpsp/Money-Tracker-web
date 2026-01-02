const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const category = document.getElementById('category');

// Fetch transactions from API
async function getTransactions() {
    try {
        const res = await fetch('/api/transactions');
        const data = await res.json();

        if (data.success) {
            const transactions = data.data;
            init(transactions);
        } else {
            console.error('Failed to load transactions');
        }
    } catch (err) {
        console.error(err);
    }
}

// Add transaction
async function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount');
        return;
    }

    const incomeCategories = ['Salary', 'Business', 'Freelance', 'Bonus', 'Interest'];
    const selectedCategory = category.value;
    const isIncome = incomeCategories.includes(selectedCategory);

    // Force positive amount from input, then apply sign based on category
    const absAmount = Math.abs(+amount.value);
    const finalAmount = isIncome ? absAmount : -absAmount;
    const type = isIncome ? 'income' : 'expense';

    const transaction = {
        text: text.value,
        amount: finalAmount,
        category: selectedCategory,
        type: type
    };

    try {
        const res = await fetch('/api/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        });

        const data = await res.json();

        if (data.success) {
            addTransactionDOM(data.data);
            updateValues(await fetchTransactionsForUpdate());
            text.value = '';
            amount.value = '';
        } else {
            alert(data.error);
        }
    } catch (err) {
        console.error(err);
    }
}

// Helper to get current transactions for updating values without full reload
async function fetchTransactionsForUpdate() {
    const res = await fetch('/api/transactions');
    const data = await res.json();
    return data.data;
}

// Add transaction to DOM list
function addTransactionDOM(transaction) {
    // Get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    // Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction('${transaction._id}')">x</button>
    <div style="font-size: 0.8rem; color: #aaa; width: 100%; margin-top: 5px;">${transaction.category}</div> 
  `;

    list.appendChild(item);
}

// Update the balance, income and expense
function updateValues(transactions) {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
        -1
    ).toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `+$${income}`;
    money_minus.innerText = `-$${expense}`;
}

// Remove transaction by ID
async function removeTransaction(id) {
    try {
        const res = await fetch(`/api/transactions/${id}`, {
            method: 'DELETE'
        });
        const data = await res.json();

        if (data.success) {
            // Reload
            list.innerHTML = '';
            getTransactions();
        }
    } catch (err) {
        console.error(err);
    }
}

// Init app
function init(transactions) {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues(transactions);
}

form.addEventListener('submit', addTransaction);

getTransactions();
