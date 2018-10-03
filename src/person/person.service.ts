import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';

import { Person } from './interface/person';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PersonService {

    constructor(@InjectModel('Person') private readonly personModel: Model<Person>) {}

    async create(person: Person) {
       const created = new this.personModel(person);
       return await created.save();
    }

    async update(id: string, person: Person) {
        return await this.personModel.updateOne({_id:id}, {$set:person});
    }

    async findOne(id: string): Promise<Person> {
        return await this.personModel.findOne({_id:id});
    }

    async findAll(): Promise<Person[]> {
        return await this.personModel.find().exec();
    }

    async remove(id: string) {
        return await this.personModel.deleteOne({_id:id});
    }
}
