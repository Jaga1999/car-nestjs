import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './DTO/create-report.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './reports.entity';
import { User } from 'src/users/users.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private readonly repo: Repository<Report>,
  ) {}

  async changeApproval(id: string, approved: boolean) {
    const report = await this.repo.findOne({ where: { id: parseInt(id) } });
    if (!report) {
      throw new NotFoundException('Report not found!.');
    }
    report.approved = approved;
    return this.repo.save(report);
  }

  getAll() {
    return this.repo.find();
  }

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;
    return this.repo.save(report);
  }
}
