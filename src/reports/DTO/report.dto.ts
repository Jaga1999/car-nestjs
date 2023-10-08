import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  id: number;
  @Expose()
  price: number;
  @Expose()
  year: number;
  @Expose()
  lat: number;
  @Expose()
  lng: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  approved: boolean;
  @Expose()
  milage: number;
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
