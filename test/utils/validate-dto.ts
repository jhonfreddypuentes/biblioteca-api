import { validate } from 'class-validator';

export async function validateDTO(dto: any): Promise<string[]> {
  const errors = await validate(dto);
  return errors.map(e => Object.values(e.constraints || {})).flat();
}
