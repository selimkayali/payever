import { Injectable } from '@angular/core';
import { PaginationApiService } from '../../core/services';

@Injectable()
export class PaginationResolver {
  constructor(private paginationService: PaginationApiService) {}

  resolve(page: number) {
    return this.paginationService.fetchPaginationInfo(page);
  }
}
