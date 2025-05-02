import { schemaStore } from '@/app/sales-hub/config/server/schemaStore';
import { CustomActionFn } from '../types';
import { Sequelize } from 'sequelize';

interface Payload {
  category: string[] | undefined;
}

export const customActionDealsByCategory: CustomActionFn<
  Payload
> = async ({}) => {
  const Deal = schemaStore.getModel('deals');

  const result = await Deal.findAll({
    attributes: [
      [
        Sequelize.cast(Sequelize.fn('SUM', Sequelize.literal(`amount`)), 'INT'),
        'amount',
      ],
      'category',
    ],
    group: ['category'],
  });

  return result.map((data) => ({
    category: data.dataValues.category,
    amount: data.dataValues.amount,
  }));
};
