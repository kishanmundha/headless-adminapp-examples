'use client';

import { makeStyles, SearchBox, tokens } from '@fluentui/react-components';
import { useDataService } from '@headless-adminapp/app/transport';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { EntityName } from '../config/enums';
import { useDebouncedValue } from '@headless-adminapp/app/hooks';
import { useMetadata } from '@headless-adminapp/app/metadata';
import {
  collectCardColumns,
  collectCardExpandedKeys,
} from '@headless-adminapp/app/datagrid/DataGridProvider/utils';
import { CardView } from '@headless-adminapp/core/experience/view';
import { ResultSection } from './ResultSection';
import { Filter } from '@headless-adminapp/core/transport';

const useStyles = makeStyles({
  root: {
    flex: 1,
    gap: tokens.spacingVerticalL,
    padding: tokens.spacingHorizontalL,
    background: tokens.colorNeutralBackground3,
  },
});

const tables: Partial<Record<EntityName, Filter | null>> = {
  [EntityName.Application]: {
    type: 'and',
    conditions: [
      {
        field: 'status',
        operator: 'in',
        value: [
          'received',
          'shortlisted',
          'interview-scheduled',
          'interview-completed',
          'interview-no-show',
          'offered',
          'offer-accepted',
          'hired',
        ],
      },
    ],
  },
  [EntityName.Candidate]: null,
  [EntityName.Job]: null,
  [EntityName.Interview]: null,
  [EntityName.Offer]: null,
};

export default function WelcomePage() {
  const styles = useStyles();
  const dataService = useDataService();
  const [searchText, setSearchText] = useState('');
  const [search] = useDebouncedValue(searchText, 500);
  const { experienceStore, schemaStore } = useMetadata();

  const { data: cards } = useQuery({
    queryKey: ['search', 'cards'],
    queryFn: async () => {
      const result = await Promise.all(
        Object.entries(tables).map(async ([table]) => {
          const view = await experienceStore.getPublicView(table);

          return {
            logicalName: table,
            card: view.experience.card,
          };
        })
      );

      return result.reduce((acc, { logicalName, card }) => {
        acc[logicalName] = card;
        return acc;
      }, {} as Record<string, CardView>);
    },
    initialData: {},
  });

  const { data } = useQuery({
    queryKey: ['search', 'data', search],
    queryFn: async () => {
      if (search.length < 3) {
        return [];
      }

      return Promise.all(
        Object.entries(tables).map(async ([table, filter]) => {
          const view = await experienceStore.getPublicView(table);
          const schema = schemaStore.getSchema(table);

          const columns = collectCardColumns({
            cardView: view.experience.card,
            schema,
          });

          const expand = collectCardExpandedKeys({
            cardView: view.experience.card,
          });

          return dataService.retriveRecords({
            logicalName: table,
            search: search,
            limit: 5,
            columns,
            expand,
            filter,
          });
        })
      );
    },
  });

  return (
    <div className={styles.root}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: tokens.spacingVerticalL,
          maxWidth: '600px',
          marginInline: 'auto',
        }}
      >
        <div style={{ width: '100%' }}>
          <SearchBox
            placeholder="Search..."
            value={searchText}
            onChange={(e, data) => setSearchText(data.value)}
            style={{ width: '100%', maxWidth: 'unset' }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: tokens.spacingHorizontalL,
          }}
        >
          {data?.map((result) => (
            <ResultSection
              key={result.logicalName}
              schema={schemaStore.getSchema(result.logicalName)}
              cardView={cards[result.logicalName]}
              result={result}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
