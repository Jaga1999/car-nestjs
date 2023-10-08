import { Report } from 'src/reports/reports.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted a User with id : ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated a User with id : ', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed a User with id : ', this.id);
  }
}
