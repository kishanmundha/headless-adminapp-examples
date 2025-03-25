import { RecordCard } from '@headless-adminapp/fluent/PageEntityForm/RecordCard';
import {
  Body1Strong,
  Divider,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { FC } from 'react';
import { CardView } from '@headless-adminapp/core/experience/view';
import { Schema } from '@headless-adminapp/core/schema';
import { RetriveRecordsResult } from '@headless-adminapp/core/transport';
import { useOpenForm } from '@headless-adminapp/app/navigation';
import { CommandButton } from '@headless-adminapp/fluent/CommandBar/Button';
import { bundleLazyIcon } from '@headless-adminapp/icons-fluent/lazyIcon';
import { useRouter, useRouteResolver } from '@headless-adminapp/app/route';
import { PageType } from '@headless-adminapp/core/experience/app';

const ViewAllIcon = bundleLazyIcon('List24Regular', 'List24Filled');

const useStyles = makeStyles({
  item: {
    width: '100%',
    cursor: 'pointer',
    borderRadius: tokens.borderRadiusMedium,
    border: 'none',
    background: 'transparent',
    '&:hover': {
      background: tokens.colorNeutralBackground1Hover,
    },
  },
});

interface ResultSectionProps {
  schema: Schema;
  cardView: CardView;
  result: RetriveRecordsResult;
}

export const ResultSection: FC<ResultSectionProps> = ({
  schema,
  cardView,
  result,
}) => {
  const styles = useStyles();
  const openForm = useOpenForm();
  const routeResolver = useRouteResolver();
  const router = useRouter();
  if (!schema || !cardView) {
    return null;
  }

  if (!result.records.length) {
    return null;
  }

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        background: tokens.colorNeutralBackground1,
        boxShadow: tokens.shadow2,
        borderRadius: tokens.borderRadiusMedium,
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          paddingInline: 16,
          paddingBlock: 8,
          height: 40,
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Body1Strong>{schema.pluralLabel}</Body1Strong>
          <div style={{ flex: 1 }} />
          <div style={{ marginRight: -12 }}>
            <CommandButton
              Icon={ViewAllIcon}
              text="View All"
              appearance="colored"
              onClick={() => {
                router.push(
                  routeResolver({
                    type: PageType.EntityView,
                    logicalName: schema.logicalName,
                  })
                );
              }}
            />
          </div>
        </div>
      </div>
      <div>
        <Divider style={{ opacity: 0.2 }} />
      </div>
      <div>
        {result.records.map((record: Record<string, unknown>, index) => (
          <div key={record[schema.idAttribute] as string}>
            {index > 0 && <Divider style={{ opacity: 0.2 }} />}
            <button
              className={styles.item}
              style={{}}
              onClick={() => {
                const id = record[schema.idAttribute] as string;
                openForm({
                  logicalName: schema.logicalName,
                  id,
                });
              }}
            >
              <RecordCard
                key={record.id as string}
                cardView={cardView}
                record={record}
                schema={schema}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
