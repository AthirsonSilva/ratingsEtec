import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rating extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject: string;

  @Column()
  rating: number;

  @Column()
  teacher: string;

  @Column()
  student: string;

  @Column()
  positiveMessage: string;

  @Column()
  negativeMessage: string;
}
