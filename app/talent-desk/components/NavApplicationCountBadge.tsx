import { useRetriveRecords } from '@headless-adminapp/app/transport/hooks/useRetriveRecords';
import { Badge } from '@fluentui/react-components';
import { applicationSchema } from '../config/schema/application';

export function NavApplicationCountBadge() {
  const { data } = useRetriveRecords({
    columns: [],
    filter: {
      type: 'and',
      conditions: [
        {
          field: 'status',
          operator: 'eq',
          value: 'received',
        },
      ],
    },
    maxRecords: 1,
    schema: applicationSchema,
    search: '',
    sorting: [],
  });

  if (!data?.count) {
    return null;
  }

  return <Badge>{data.count}</Badge>;
}
