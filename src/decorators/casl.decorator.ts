import { SetMetadata } from "@nestjs/common";
import { AppAbility } from "../auth/casl-ability.service";

export enum CHECK_POLICIES_KEY {
  HANDLER = "CHECK_POLICIES_HANDLER",
  CAN = "CHECK_POLICIES_CAN",
  CANNOT = "CHECK_POLICIES_CANNOT"
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export const CheckPolicies = (...handler: PolicyHandlerCallback[]) => SetMetadata(CHECK_POLICIES_KEY.HANDLER, handler);

// export const Can = ()=>SetMetadata(CHECK_POLICIES_KEY.CAN)