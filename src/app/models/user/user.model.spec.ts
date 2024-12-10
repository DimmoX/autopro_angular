import { User } from './user.model';

describe('User', () => {
  it('should create an instance', () => {
    const user: User = {
      nombre: 'Diego',
      apellido: 'Muñoz',
      email: 'dmunozm@autopro.cl',
      passwd: 'AB123456',
      role: ['admin', 'mecanico']
    };
    
    expect(user).toBeTruthy();
  });
});
