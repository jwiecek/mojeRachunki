import { ApiModelProperty } from '@nestjs/swagger';

export class CreateBillDto {

  @ApiModelProperty()
  readonly imageBillPath?: string;

  @ApiModelProperty()
  readonly imageProductPath?: string;

  @ApiModelProperty()
  readonly price: string;

  @ApiModelProperty()
  readonly purchaseDate: string;

  @ApiModelProperty()
  readonly purchaseType: string;

  @ApiModelProperty()
  readonly shop: string;

  @ApiModelProperty()
  readonly product: string[];

  @ApiModelProperty()
  readonly brand: string[];

  @ApiModelProperty()
  readonly warranty: number;

  @ApiModelProperty()
  readonly description?: string;

  @ApiModelProperty()
  readonly createdAt: string;

  @ApiModelProperty()
  readonly updatedAt: string;

  @ApiModelProperty()
  readonly createdById: string;

  @ApiModelProperty()
  readonly updatedById?: string;
}
