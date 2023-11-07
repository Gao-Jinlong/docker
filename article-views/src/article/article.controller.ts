import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.articleService.findOne(+id);
  }

  @Get(':id/view')
  async view(@Param('id') id: string) {
    return await this.articleService.view(+id);
  }
}
