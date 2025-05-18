import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Biblioteca } from '../../biblioteca/biblioteca/biblioteca';


@Entity()
export class Libro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  autor: string;

  @Column({ type: 'date' })
  fechaPublicacion: string; // YYYY-MM-DD

  @Column()
  isbn: string;

  @ManyToMany(() => Biblioteca, biblioteca => biblioteca.libros)
  bibliotecas: Biblioteca[];
}
