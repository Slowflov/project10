// ViewTransactions.js
import React from 'react';
import argentBankLogo from '../img/argentBankLogo.png';
import UserInfo from '../redux/userInfo';

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
                <div className="transaction-headers">
        <div className="transaction-header">Date</div>
        <div className="transaction-header">Description</div>
        <div className="transaction-header">Amount</div>
        <div className="transaction-header">Balance</div>
    </div>
                    <div className="transaction-block">
                        <div className="transaction-date">27/02/20</div>
                        <div className="transaction-description">Golden Sun Bakery</div>
                        <div className="spacer"></div> 
                        <div className="transaction-amount">$8.00</div>
                        <div className="transaction-balance">
                            <span className="balance-text">$298.00</span>
                            <i className="fa fa-arrow-down balance-icon" aria-hidden="true"></i>
                        </div>
                    </div>

                    <div className="transaction-block">
                        <div className="transaction-date">27/02/20</div>
                        <div className="transaction-description">Golden Sun Bakery</div>
                        <div className="spacer"></div> 
                        <div className="transaction-amount">$8.00</div>
                        <div className="transaction-balance">
                            <span className="balance-text">$298.00</span>
                            <i className="fa fa-arrow-down balance-icon" aria-hidden="true"></i>
                        </div>
                    </div>

                    <div className="transaction-block">
                        <div className="transaction-date">
                            27/02/20
                            <div className="vertical-text">
                                <div className="transaction-type">Transaction type</div>
                                <div className="transaction-category">Category</div>
                                <div className="transaction-note">Note</div>
                            </div>
                        </div>
                        <div className="transaction-description">
                            Golden Sun Bakery
                            <div className="vertical-text">
                                <div>Electronic</div>
                                <div>
                                    Food <i className="fa fa-pencil icon-with-margin" aria-hidden="true"></i>
                                </div>
                                <div>
                                    lorem ipsum <i className="fa fa-pencil icon-with-margin" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                        <div className="spacer"></div> 
                        <div className="transaction-amount">$8.00</div>
                        <div className="transaction-balance">
                            <span className="balance-text">$298.00</span>
                            <i className="fa fa-arrow-down balance-icon" aria-hidden="true"></i>
                        </div>
                    </div>

                    <div className="transaction-block">
                        <div className="transaction-date">27/02/20</div>
                        <div className="transaction-description">Golden Sun Bakery</div>
                        <div className="spacer"></div> 
                        <div className="transaction-amount">$8.00</div>
                        <div className="transaction-balance">
                            <span className="balance-text">$298.00</span>
                            <i className="fa fa-arrow-down balance-icon" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div className="transaction-block">
                        <div className="transaction-date">27/02/20</div>
                        <div className="transaction-description">Golden Sun Bakery</div>
                        <div className="spacer"></div> 
                        <div className="transaction-amount">$8.00</div>
                        <div className="transaction-balance">
                            <span className="balance-text">$298.00</span>
                            <i className="fa fa-arrow-down balance-icon" aria-hidden="true"></i>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="footer">
                <p className="footer-text">Copyright 2020 Argent Bank</p>
            </footer>
        </div>
    );
};


export default ViewTransactions;

