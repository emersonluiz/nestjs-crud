import { Controller, Get, Req, Post, Header, Param, Body, Put, Delete, Res, HttpStatus, ForbiddenException, HttpException, InternalServerErrorException } from '@nestjs/common';
import { create } from 'domain';

import { PersonDto } from './dto/PersonDto';
import { PersonService } from './person.service';
import { Person } from './interface/person';

@Controller("persons")
export class PersonController {

    constructor(private readonly personService: PersonService) {}

    @Get()
    async findAll(): Promise<Person[]> {
        return this.personService.findAll();
    }

    @Get(":id")
    findOne(@Param() params): Promise<Person> {
       return this.personService.findOne(params.id)
    }

    @Post()
    async create(@Body() personDto: PersonDto, @Res() res) {
        this.personService.create(personDto);
        res.status(HttpStatus.CREATED).send();
    }

    @Put(':id')
    async update(@Param('id') id, @Body() personDto: PersonDto, @Res() res) {
        this.personService.update(id, personDto);
        res.status(HttpStatus.NO_CONTENT).send();
    }

    @Delete(':id')
    remove(@Param('id') id, @Res() res) {
        this.personService.remove(id);
        res.status(HttpStatus.NO_CONTENT).send();
    }
}
