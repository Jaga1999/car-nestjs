import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateReportDto } from './DTO/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './DTO/report.dto';
import { ApproveReportDto } from './DTO/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDto } from './DTO/get-estimate.dto';

@UseGuards(AuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private reportSerice: ReportsService) {}

  @Post()
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user) {
    return this.reportSerice.create(body, user);
  }

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    console.log(query);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportSerice.changeApproval(id, body.approved);
  }
}
