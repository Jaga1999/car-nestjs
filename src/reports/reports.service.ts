import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './DTO/create-report.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './reports.entity';
import { User } from 'src/users/users.entity';
import { GetEstimateDto } from './DTO/get-estimate.dto';

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

  createEstimate(estimatedto: GetEstimateDto) {
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make: estimatedto.make })
      .andWhere('model = :model', { model: estimatedto.model })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat: estimatedto.lat })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng: estimatedto.lng })
      .andWhere('year - :year BETWEEN -3 AND 3', { year: estimatedto.year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(milage - :milage)', 'DESC')
      .setParameters({ milage: estimatedto.milage })
      .limit(3)
      .getRawOne();
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
