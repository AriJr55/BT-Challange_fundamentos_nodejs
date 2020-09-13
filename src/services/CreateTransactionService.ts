import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Trans {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Trans): Transaction {
    const balance = this.transactionsRepository.getBalance();
    if (type !== 'income' && type !== 'outcome') {
      throw new Error('Operação inválida');
    }
    if (balance.total < value && type === 'outcome') {
      throw new Error('Saldo infuciente');
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
