import { Item } from './item';

export class Department extends Item {
	constructor() {
		super();
		this.type = 'g0';
	}
	name: string;
	parentId: string;
	childrenIds: string[];
}
