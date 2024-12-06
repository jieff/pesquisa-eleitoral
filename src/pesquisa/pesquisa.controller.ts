import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PesquisaService } from './pesquisa.service';
import { diskStorage } from 'multer';
import { File } from 'multer';



@Controller('pesquisa')
export class PesquisaController {
  constructor(private readonly pesquisaService: PesquisaService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: File) {
    if (!file) {
      throw new Error('Arquivo não encontrado');
    }
    return this.pesquisaService.processarArquivo(file);
  }
}
