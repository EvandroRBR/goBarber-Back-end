// Respository é a conexão entre e a persistância da base de dados e a rota ou outra parte do código, ou seja,
// sempre que eu quiser fazer uma chamada na database para criação, busca, atualização ou remoção eu venho aqui.
import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
