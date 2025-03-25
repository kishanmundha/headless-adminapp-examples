import { ItemUpdateContext } from '@headless-adminapp/app/board/types';

export function handleStatusUpdate(status: string) {
  return async function (context: ItemUpdateContext) {
    try {
      context.utility.showProgressIndicator();
      await context.dataService.updateRecord(
        context.primaryControl.logicalName,
        context.primaryControl.id,
        {
          status,
        }
      );
      context.queryClient.invalidateQueries({
        queryKey: [
          'data',
          'retriveRecords',
          context.primaryControl.logicalName,
        ],
      });
    } finally {
      context.utility.hideProgressIndicator();
    }
  };
}

export function getAcceptSourceIds(
  status: string,
  statusTransitions: Record<string, string[]>
) {
  return Object.keys(statusTransitions).filter((key) =>
    statusTransitions[key]?.includes(status)
  );
}
