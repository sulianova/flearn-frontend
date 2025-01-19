import { i18n } from "shared";
import { envService } from "services/env.service";

import { composeTgMessage } from "./tg";

const MONTHLY_ORDER_MESSAGE = composeTgMessage([
  `Добрый день! Хочу оплатить подписку Flearn PRO на месяц за ${i18n.t('decision.card.priceRub.monthly_1m')}`,
]);
const QUARTERLY_ORDER_MESSAGE = composeTgMessage([
  `Добрый день! Хочу оплатить подписку Flearn PRO на 3 месяца за ${i18n.t('decision.card.priceRub.quarterly_3m')}`,
]);

export const MONTHLY_ORDER_URL = `${envService.telegramUrl}?text=${MONTHLY_ORDER_MESSAGE}`;
export const QUARTERLY_ORDER_URL = `${envService.telegramUrl}?text=${QUARTERLY_ORDER_MESSAGE}`;
