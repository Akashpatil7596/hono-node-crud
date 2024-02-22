import "reflect-metadata";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ type: "varchar", nullable: true })
    username: string;

    @Column({ type: "varchar" })
    email: string;

    @Column({ type: "varchar" })
    password: string;

    @Column({ type: "varchar", nullable: true })
    age: number;

    @Column({ type: "varchar" })
    salary: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
}
