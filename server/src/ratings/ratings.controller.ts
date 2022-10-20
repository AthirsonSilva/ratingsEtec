import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { response } from 'express';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './entities/rating.entity';
import { RatingsService } from './ratings.service';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  create(@Body() rating: Rating) {
    const newRating = this.ratingsService.create(rating);

    return response.status(HttpStatus.CREATED).json({
      newRating,
      message: 'Rating created successfully',
    });
  }

  @Get()
  findAll() {
    const ratings = this.ratingsService.findAll();

    return response.status(HttpStatus.OK).json({
      ratings,
      message: 'Ratings retrieved successfully',
    });
  }

  /*   @Get(':id')
  findOne(@Param('id') id: string) {
    const rating = this.ratingsService.findOne(+id);

    return response.status(HttpStatus.OK).json({
      rating,
      message: 'Rating retrieved successfully',
    });
  } */

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    const rating = this.ratingsService.update(+id, updateRatingDto);

    return response.status(HttpStatus.OK).json({
      rating,
      message: 'Rating updated successfully',
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const formerRating = this.ratingsService.remove(+id);

    return response.status(HttpStatus.OK).json({
      formerRating: formerRating,
      message: 'Rating deleted successfully',
    });
  }
}
