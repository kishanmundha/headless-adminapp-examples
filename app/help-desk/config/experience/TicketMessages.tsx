import { ScrollView } from '@headless-adminapp/app/components/ScrollView';
import {
  Avatar,
  Body1Strong,
  Caption1,
  Divider,
  Input,
  tokens,
} from '@fluentui/react-components';
import dayjs from 'dayjs';
import { useGridData } from '@headless-adminapp/app/datagrid/hooks';
import { Data, RetriveRecordsResult } from '@headless-adminapp/core/transport';
import { Message } from '../schema/message';
import { Customer } from '../schema/customer';
import { Fragment, useEffect, useRef, useState } from 'react';
import { bundleLazyIcon } from '@headless-adminapp/icons-fluent/lazyIcon';
import { useDataService } from '@headless-adminapp/app/transport';
import { useRecordId } from '@headless-adminapp/app/dataform/hooks/useRecordId';
import { Ticket } from '../schema/ticket';
import { useGridRefresh } from '@headless-adminapp/app/datagrid/hooks';
import { Agent } from '../schema/agent';
import { EntityName } from '../enums';

const SendIcon = bundleLazyIcon('Send24Regular', 'Send24Filled');

export function TicketMessages() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const data = useGridData() as RetriveRecordsResult<Message>;
  const refresh = useGridRefresh();

  const recordId = useRecordId();

  const [message, setMessage] = useState('');

  const dataService = useDataService();

  useEffect(() => {
    if (scrollRef.current?.parentElement) {
      scrollRef.current.parentElement.scrollTop =
        scrollRef.current.scrollHeight;
    }
  }, [data]);

  const handleSendMessage = async () => {
    if (!message) {
      return;
    }

    const record = await dataService.retriveRecord<Ticket>(
      EntityName.Ticket,
      recordId,
      ['subject', 'customer_id']
    );

    await dataService.createRecord<Data<Message>>('messages', {
      message,
      ticket_id: {
        id: recordId,
        name: record.subject ?? '',
      },
      agent_id: null,
      customer_id: record.customer_id,
      timestamp: new Date().toISOString(),
    });

    setMessage('');
    refresh();
  };

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        gap: 8,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          // gap: 12,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          // overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            height: 40,
            paddingInline: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Body1Strong>Messages</Body1Strong>
          </div>
        </div>
        <div>
          <Divider style={{ opacity: 0.2 }} />
        </div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              // gap: 4,
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
            }}
          >
            <div style={{ flex: 1, display: 'flex', minHeight: 400 }}>
              <ScrollView autoHide>
                <div
                  style={{ display: 'flex', flexDirection: 'column' }}
                  ref={scrollRef}
                >
                  {data?.records.map((record: Data<Message>, index) => {
                    const customer = record.$expand
                      ?.customer_id as Data<Customer>;
                    const agent = record.$expand?.agent_id as Data<Agent>;

                    const isCustomer = !!record.customer_id;

                    const sender = isCustomer ? customer : agent;

                    return (
                      <Fragment key={record.id}>
                        {index > 0 && <Divider style={{ opacity: 0.2 }} />}
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 8,
                            padding: 8,
                          }}
                        >
                          <div>
                            <Avatar
                              image={{
                                src: sender?.avatar as unknown as string,
                              }}
                            />
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 8,
                            }}
                          >
                            <div>
                              <span
                                style={{ fontWeight: tokens.fontWeightBold }}
                              >
                                {sender?.fullName}
                              </span>{' '}
                              <span
                                style={{
                                  color: tokens.colorNeutralForeground3,
                                }}
                              >
                                &lt;
                                {sender?.email}
                                &gt;
                              </span>
                            </div>
                            <div>{record.message}</div>
                          </div>
                          <div>
                            <Caption1
                              style={{
                                whiteSpace: 'nowrap',
                                color: tokens.colorNeutralForeground3,
                              }}
                            >
                              {dayjs(record.timestamp).format(
                                'MMM D, YYYY, h:mm A'
                              )}
                            </Caption1>
                          </div>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </ScrollView>
            </div>
            <Divider style={{ opacity: 0.2 }} />
            <form
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 8,
                padding: 8,
              }}
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <Input
                placeholder="Type a message..."
                style={{ flex: 1 }}
                contentAfter={<SendIcon size={16} />}
                value={message}
                onChange={(e, newValue) => setMessage(newValue.value)}
              />
              <button type="submit" style={{ display: 'none' }} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
