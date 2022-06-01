import { Entity, Column, ObjectIdColumn } from "typeorm";

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
	@Column()
	backgrounds: string[] = [];

	@Column()
	aboutMe: string = "Você sabia que pode alterar esta mensagem?";

	constructor(options?: Omit<Profile, "backgrounds">) {
		if (options) {
			for (const key of Object.keys(options)) {
				if (options[key]) this[key] = options[key];
			}
		}
	}
}

@Entity("users")
export class User {
	@ObjectIdColumn({ name: "_id", unique: true })
    id: string;
	
    @Column(() => SubEntityblockList)
    blockList: SubEntityblockList;

    @Column()
    coin: number = 0;

    @Column()
    dailyCooldown: number = 0;

    @Column(() => Profile)
    profile: Profile = new Profile();

    @Column(() => Engines)
    engines: Engines;
    
    @Column()
    betCooldown: number = 0;

	constructor(userOptions: User) {
		if (!userOptions) return;
		Object.assign(this, userOptions);
	}
}
