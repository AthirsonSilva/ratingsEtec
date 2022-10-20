import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject: string;

  @Column()
  teacher: string;

  @Column()
  student: string;

  @Column()
  rating: number;

  @Column()
  positiveMessage: string;

  @Column()
  negativeMessage: string;
}
