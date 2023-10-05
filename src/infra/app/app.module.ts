import { Module } from '@nestjs/common';
import { PetModule } from '../../pet/pet.module';
import { UserModule } from '../../user/user.module';

@Module({
  imports: [UserModule, PetModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
