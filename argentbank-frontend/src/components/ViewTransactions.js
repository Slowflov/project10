// ViewTransactions.js
import React from 'react';
// import { Link } from 'react-router-dom';
import argentBankLogo from '../img/argentBankLogo.png'; // Убедитесь, что путь правильный
import UserInfo from '../redux/userInfo';  // Импортируйте компонент UserInfo

const ViewTransactions = () => {
    return (
        <div>
            <nav className="main-nav">
                <a className="main-nav-logo" href="/">
                    <img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
                    <h1 className="sr-only">Argent Bank</h1>
                </a>
                <div>
                    <UserInfo />
                </div>
            </nav>
            <main className="main bg-dark">
                <div className="header">
                    <h1>View Transactions</h1>
                </div>
                <section className="account gray-background">
    <div className="account-content-wrapper">
        <h3 className="account-title">Argent Bank Checking (x3448)</h3>
        <p className="account-amount">$48,098.43</p>
        <p className="account-amount-description">Available Balance</p>
    </div>
    <div className="account-content-wrapper cta">
        <span className="close-icon">×</span>
    </div>
</section>

                <section className="transactions-content">
                    <table className="transactions-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array(5).fill().map((_, index) => (
                                <tr key={index}>
                                    <td>
                                        27/02/20
                                        {index === 2 && (
                                            <div className="vertical-text">
                                                <div>Transaction type</div>
                                                <div>Category</div>
                                                <div>Note</div>
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        Golden Sun Bakery
                                        {index === 2 && (
                                            <div className="vertical-text">
                                                <div>Electronic</div>
                                                <div>Food</div>
                                                <div>lorem ipsum</div>
                                            </div>
                                        )}
                                    </td>
                                    <td>$8.00</td>
                                    <td>$298.00
                                        
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
            <footer className="footer">
                <p className="footer-text">Copyright 2020 Argent Bank</p>
            </footer>
        </div>
    );
};





export default ViewTransactions;
