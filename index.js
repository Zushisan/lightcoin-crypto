
class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {

    if(this.isAllowed()){
      this.time = new Date();
      this.account.addTransaction(this);
    }
    else {
      console.log('Cannot proceed, insuficiant funds.')
    }

  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -(this.amount);
  }

  isAllowed() {

    if (this.account.balance >= this.amount) {
      return true;
    }
    else {
      return false;
    }
  }

}

class Account {

  constructor(username) {
    this.username = username;
    this.transaction = [];
  }

  get balance() {
    let balance = 0;
    for(let type of this.transaction){
      balance += type.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transaction.push(transaction);
  }

}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("Romain-bank");


t1 = new Withdrawal(50.25, myAccount);
t1.commit();
// console.log('Transaction 1:', t1);

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
// console.log('Transaction 2:', t2);

t3 = new Deposit (728, myAccount);
t3.commit()
// console.log('Transaction 3:', t3);

t4 = new Withdrawal(9.99, myAccount);
t4.commit();
// console.log('Transaction 2:', t2);

console.log('Balance:', myAccount.balance);
// console.log('Transaction: ', myAccount.transaction);
