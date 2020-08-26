import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const reduce = (
      acumulator: number,
      item: Transaction,
      type: 'income' | 'outcome',
    ): number => {
      return item.type === type ? acumulator + item.value : acumulator;
    };

    const income = this.transactions.reduce(
      (acumulator, item) => reduce(acumulator, item, 'income'),
      0,
    );

    const outcome = this.transactions.reduce(
      (acumulator, item) => reduce(acumulator, item, 'outcome'),
      0,
    );

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
