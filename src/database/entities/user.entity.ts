import { Entity, Column } from "typeorm";
import { BaseEntity } from "./base.entity";

class SubEntityblockList {
    @Column()
	isBlockListed: boolean;

	@Column()
	isPermanent: boolean;

	@Column()
	expiresAt?: number;

	@Column()
	reason?: string;
}

class Engines {
	@Column()
	duration: number;

	@Column()
	id: string;
}

class Profile {
	@Column({ default: () => [] })
	backgrounds: string[];

	@Column({
		default: () => "Você sabia que pode alterar esta mensagem?",
	})
	aboutMe: string;
}

@Entity("users")
export class User extends BaseEntity {
    @Column((type) => SubEntityblockList)
    blockList: SubEntityblockList;

    @Column()
    coin: number = 0;

    @Column()
    dailyCooldown: number = 0;

    @Column((type) => Profile)
    profile: Profile;

    @Column((type) => Engines)
    engines: Engines;
    
    @Column()
    betCooldown: number = 0;

    @Column()
	globalBan: boolean;

	constructor(id: string) {
		super();

		this._id = id;
	}
}
