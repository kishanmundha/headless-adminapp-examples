import { applicationSchema } from '@/app/talent-desk/config/schema/application';
import { defineBoardConfig } from '@headless-adminapp/app/board/utils';
import { RecordItem } from './RecordItem';

export const configBase = defineBoardConfig({
  title: 'Application pipeline',
  description: 'Drag and drop to change status',
  schema: applicationSchema,
  minColumnWidth: 320,
  maxColumnWidth: 400,
  sorting: [
    {
      field: 'applied_at',
      order: 'asc',
    },
  ],
  projection: {
    columns: [
      'title',
      'created_at',
      'updated_at',
      'status',
      'candidate_id',
      'job_id',
      'applied_at',
    ],
  },
  PreviewComponent: RecordItem,
  columnConfigs: [],
  emptyMessage: 'No applications in this stage',
});
