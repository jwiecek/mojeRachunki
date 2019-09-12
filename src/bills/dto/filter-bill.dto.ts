import { ApiModelProperty } from '@nestjs/swagger';

export class FilterBillDto {

  @ApiModelProperty()
  readonly createdById?: string;

  @ApiModelProperty()
  readonly selectedCategory?: string[];

  @ApiModelProperty()
  readonly selectedPriceFrom?: number;

  @ApiModelProperty()
  readonly selectedPriceTo?: number;

  @ApiModelProperty()
  readonly purchaseDateFrom?: string;

  @ApiModelProperty()
  readonly purchaseDateTo?: string;

  @ApiModelProperty()
  readonly warrantyDateFrom?: string;

  @ApiModelProperty()
  readonly warrantyDateTo?: string;

  @ApiModelProperty()
  readonly searchIdList?: string[];
}

