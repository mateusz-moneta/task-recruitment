import { Controller, Get, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('movies')
export class MoviesController {
  @Get()
  async find(): Promise<any> {
    const file = createReadStream(join(process.cwd(), 'data/db.json'));
    return new StreamableFile(file)['genres'];
  }
}
