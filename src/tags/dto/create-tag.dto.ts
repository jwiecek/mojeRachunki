import { ApiModelProperty } from '@nestjs/swagger';

export class CreateTagDto {

  @ApiModelProperty()
  readonly label: string;

  @ApiModelProperty()
  readonly type: string;

  @ApiModelProperty()
  readonly belongToLabel?: string[];

  @ApiModelProperty()
  readonly createdById?: string[];
}
