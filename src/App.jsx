import React, { useState, useEffect } from 'react';
import TransactionForm from './Components/TransactionForm';
import TransactionList from './Components/TransactionList';
import MonthlyExpenseChart from './Components/MonthlyExpenseChart';
import DailyExpenseChart from './Components/DailyExpenseChart';
import CategoryExpenseChart from './Components/CategoryExpenseChart';
import MostExpensiveTransactions from './Components/MostExpensiveTransactions';
import axios from 'axios';

const App = () => {
    const [transactions, setTransactions] = useState([]);
    const [editingTransaction, setEditingTransaction] = useState(null);

    const fetchTransactions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/transactions');
            setTransactions(response.data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <div>
            <h1>Transaction Tracker</h1>
            <TransactionForm
                fetchTransactions={fetchTransactions}
                editingTransaction={editingTransaction}
                setEditingTransaction={setEditingTransaction}
            />
            <TransactionList
                transactions={transactions}
                fetchTransactions={fetchTransactions}
                setEditingTransaction={setEditingTransaction}
            />
            <div className="charts">
                <MonthlyExpenseChart transactions={transactions} />
                <DailyExpenseChart transactions={transactions} />
                <CategoryExpenseChart transactions={transactions} />
                <MostExpensiveTransactions transactions={transactions} />
            </div>
        </div>
    );
};

export default App;
