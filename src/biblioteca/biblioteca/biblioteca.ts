import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Libro } from '../../libro/libro/libro';


@Entity()
export class Biblioteca {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column()
  ciudad: string;

  @Column()
  horaApertura: string; // Ejemplo: "08:00"

  @Column()
  horaCierre: string; // Ejemplo: "18:00"

  @ManyToMany(() => Libro, libro => libro.bibliotecas, { cascade: true })
  @JoinTable()
  libros: Libro[];
}
