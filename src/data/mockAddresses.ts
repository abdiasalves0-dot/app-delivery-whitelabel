import { Address } from '../types/user';

export const mockAddresses: Address[] = [
  {
    id: 'addr-1',
    label: 'Principal',
    street: 'Av. Paulista',
    number: '1842',
    complement: 'Torre Norte - 14º Andar',
    neighborhood: 'Bela Vista',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01310-200',
    isDefault: true
  },
  {
    id: 'addr-2',
    label: 'Casa',
    street: 'Rua Oscar Freire',
    number: '920',
    complement: 'Apto 42',
    neighborhood: 'Jardins',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01426-001',
    isDefault: false
  },
  {
    id: 'addr-3',
    label: 'Escritório',
    street: 'Rua Funchal',
    number: '418',
    complement: 'Conjunto 802',
    neighborhood: 'Vila Olímpia',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '04551-060',
    isDefault: false
  }
];
