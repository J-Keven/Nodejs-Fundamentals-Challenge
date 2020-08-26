import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

// Single responsible principle -> princípio de responsabilidade unica;
// Data transfer object -> objeto de transferencia de dados
// Separations of Concerns -> separação de perocupações | responsabilidades;
// Dependece Inversion principle -> principio da inversão de dependencia
// Don't repeat yourself ->  Nao se Repita

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    const { total } = this.transactionsRepository.getBalance();
    if (type === 'outcome' && value > total) {
      throw Error('withdrawal amount exceeds the total amount');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
