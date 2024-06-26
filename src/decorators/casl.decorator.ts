import {SetMetadata} from "@nestjs/common";
import {AppAbility} from "../auth/casl-ability.service";
import {Action} from "../enum/action.enum";
import {InferSubjects} from "@casl/ability";

export enum CHECK_POLICIES_KEY {
  HANDLER = "CHECK_POLICIES_HANDLER",
  CAN = "CHECK_POLICIES_CAN",
  CANNOT = "CHECK_POLICIES_CANNOT"
}

export type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type CaslHandlerType = PolicyHandlerCallback | PolicyHandlerCallback[]

export const CheckPolicies = (...handlers: PolicyHandlerCallback[]) => SetMetadata(CHECK_POLICIES_KEY.HANDLER, handlers);

export const Can = (action: Action, subject: InferSubjects<any>, conditions?: any) => SetMetadata(CHECK_POLICIES_KEY.CAN,
  (ability: AppAbility) => ability.can(action, subject, conditions))

export const Cannot = (action: Action, subject: InferSubjects<any>, conditions?: any) => SetMetadata(CHECK_POLICIES_KEY.CANNOT,
  (ability: AppAbility) => ability.cannot(action, subject, conditions))
