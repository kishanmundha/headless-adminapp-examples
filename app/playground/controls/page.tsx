/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  Body1,
  Caption1,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
  tokens,
} from '@fluentui/react-components';
import { ScrollView } from '@headless-adminapp/app/components/ScrollView';
import { Attribute } from '@headless-adminapp/core';
import {
  AttachmentAttribute,
  AttachmentsAttribute,
  BooleanAttribute,
  ChoiceAttribute,
  DateAttribute,
  LookupAttribute,
  NumberAttribute,
  StringAttribute,
} from '@headless-adminapp/core/attributes';
import { ChoicesAttribute } from '@headless-adminapp/core/attributes/ChoiceAttribute';
import { DateRangeAttribute } from '@headless-adminapp/core/attributes/DateRangeAttribute';
import { MultiLookupAttribute } from '@headless-adminapp/core/attributes/LookupAttribute';
import { MoneyAttribute } from '@headless-adminapp/core/attributes/MoneyAttribute';
import { StandardControl } from '@headless-adminapp/fluent/PageEntityForm/StandardControl';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const useStyles = makeStyles({
  table: {
    '& tr:hover': {
      backgroundColor: 'unset',
    },
    maxWidth: '1024px',
    margin: 'auto',
  },
});

const stringAttributes: Record<string, StringAttribute> = {
  stringText: {
    type: 'string',
    format: 'text',
    label: 'Text',
    description: 'Single line text input',
    default: 'Hello World',
  },
  stringEmail: {
    type: 'string',
    format: 'email',
    label: 'Email',
    description: 'Email input',
    default: 'demo@example.com',
  },
  stringPhone: {
    type: 'string',
    format: 'phone',
    label: 'Phone',
    description: 'Phone/Telephone input',
    default: '9876543210',
  },
  stringUrl: {
    type: 'string',
    format: 'url',
    label: 'URL',
    description: 'URL input',
    default: 'https://example.com',
  },
  stringTextarea: {
    type: 'string',
    format: 'textarea',
    label: 'Textarea',
    description: 'Multi line text input',
    default: 'Hello World',
  },
  stringRichtext: {
    type: 'string',
    format: 'richtext',
    label: 'Rich Text',
    description: 'Rich text input with formatting options',
    default: '<p>Hello World</p>',
  },
};

const numberAttributes: Record<string, NumberAttribute> = {
  number: {
    type: 'number',
    format: 'integer',
    label: 'Integer Number',
    description: 'Integer number input',
    default: 123,
  },
  numberDecimal: {
    type: 'number',
    format: 'decimal',
    label: 'Decimal Number',
    description: 'Decimal number input',
    default: 123.456,
  },
  numberDuration: {
    type: 'number',
    format: 'duration',
    label: 'Duration',
    description: 'Duration input (in minutes)',
    default: 120,
  },
  numberTime: {
    type: 'number',
    format: 'time',
    label: 'TimePicker',
    description: 'Time input (in minutes of the day)',
    default: 480,
  },
};

const booleanAttributes: Record<string, BooleanAttribute> = {
  boolean: {
    type: 'boolean',
    label: 'Boolean',
    description: 'Boolean input (true/false)',
    default: true,
  },
};

const dateAttributes: Record<string, DateAttribute> = {
  date: {
    type: 'date',
    format: 'date',
    label: 'Date',
    description: 'Date input',
    default: dayjs().format('YYYY-MM-DD'),
  },
  dateTime: {
    type: 'date',
    format: 'datetime',
    label: 'DateTime',
    description: 'Date and time input',
    default: dayjs().toISOString(),
  },
};

const dateRangeAttributes: Record<string, DateRangeAttribute> = {
  dateRange: {
    type: 'daterange',
    label: 'Date Range',
    description: 'Date range input',
    default: [
      dayjs().format('YYYY-MM-DD'),
      dayjs().add(7, 'day').format('YYYY-MM-DD'),
    ],
  },
};

const choiceAttributes: Record<string, ChoiceAttribute<string | number>> = {
  choice: {
    type: 'choice',
    label: 'Single Choice',
    description: 'Single choice input',
    string: true,
    default: 'option1',
    options: [
      {
        label: 'Option 1',
        value: 'option1',
      },
      {
        label: 'Option 2',
        value: 'option2',
      },
    ],
  },
};

const choicesAttributes: Record<string, ChoicesAttribute<string | number>> = {
  choices: {
    type: 'choices',
    label: 'Multiple Choices',
    description: 'Multiple choice input',
    string: true,
    default: ['option1', 'option2'],
    options: [
      {
        label: 'Option 1',
        value: 'option1',
      },
      {
        label: 'Option 2',
        value: 'option2',
      },
      {
        label: 'Option 3',
        value: 'option3',
      },
    ],
  },
};

const moneyAttributes: Record<string, MoneyAttribute> = {
  money: {
    type: 'money',
    label: 'Money',
    description: 'Money input',
    default: 123.456,
  },
};

const attachmentAttributes: Record<string, AttachmentAttribute> = {
  attachment: {
    type: 'attachment',
    format: 'image',
    label: 'Attachment (Image)',
    description: 'Single attachment input for images',
    location: 'local',
    default: {
      name: 'image.png',
      url: 'https://fastly.picsum.photos/id/690/50/50.jpg?hmac=VRPkLSnfwQvJbck9s5ad_qQ6XQrqJavCa6GgkMRTq8Y',
      size: 123456,
      type: 'image/png',
    },
  },
  attachmentAudio: {
    type: 'attachment',
    format: 'audio',
    label: 'Attachment (Audio)',
    description: 'Single attachment input for audio files',
    location: 'local',
    default: {
      name: 'audio.mp3',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      size: 123456,
      type: 'audio/mpeg',
    },
  },
  attachmentVideo: {
    type: 'attachment',
    format: 'video',
    label: 'Attachment (Video)',
    description: 'Single attachment input for video files',
    location: 'local',
    default: {
      name: 'video.mp4',
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      size: 123456,
      type: 'video/mp4',
    },
  },
  attachmentDocument: {
    type: 'attachment',
    format: 'document',
    label: 'Attachment (Document)',
    description: 'Single attachment input for document files',
    location: 'local',
    default: {
      name: 'document.pdf',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      size: 123456,
      type: 'application/pdf',
    },
  },
  attachmentAny: {
    type: 'attachment',
    format: 'any',
    label: 'Attachment (Any)',
    description: 'Single attachment input for any file type',
    location: 'local',
    default: {
      name: 'anyfile.txt',
      url: 'https://www.w3.org/TR/PNG/iso_8859-1.txt',
      size: 123456,
      type: 'text/plain',
    },
  },
};

const attachmentsAttributes: Record<string, AttachmentsAttribute> = {
  attachments: {
    type: 'attachments',
    format: 'image',
    label: 'Attachments (Image)',
    description: 'Multiple attachment input for images',
    location: 'local',
    default: [
      {
        name: 'image.png',
        url: 'https://fastly.picsum.photos/id/690/50/50.jpg?hmac=VRPkLSnfwQvJbck9s5ad_qQ6XQrqJavCa6GgkMRTq8Y',
        size: 123456,
        type: 'image/png',
      },
    ],
  },
  attachmentsAudio: {
    type: 'attachments',
    format: 'audio',
    label: 'Attachments (Audio)',
    description: 'Multiple attachment input for audio files',
    location: 'local',
    default: [
      {
        name: 'audio.mp3',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        size: 123456,
        type: 'audio/mpeg',
      },
    ],
  },
  attachmentsVideo: {
    type: 'attachments',
    format: 'video',
    label: 'Attachments (Video)',
    description: 'Multiple attachment input for video files',
    location: 'local',
    default: [
      {
        name: 'video.mp4',
        url: 'https://www.w3schools.com/html/mov_bbb.mp4',
        size: 123456,
        type: 'video/mp4',
      },
    ],
  },
  attachmentsDocument: {
    type: 'attachments',
    format: 'document',
    label: 'Attachments (Document)',
    description: 'Multiple attachment input for document files',
    location: 'local',
    default: [
      {
        name: 'document.pdf',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        size: 123456,
        type: 'application/pdf',
      },
    ],
  },
  attachmentsAny: {
    type: 'attachments',
    format: 'any',
    label: 'Attachments (Any)',
    description: 'Multiple attachment input for any file type',
    location: 'local',
    default: [
      {
        name: 'anyfile.txt',
        url: 'https://www.w3.org/TR/PNG/iso_8859-1.txt',
        size: 123456,
        type: 'text/plain',
      },
    ],
  },
};

const lookupAttributes: Record<string, LookupAttribute> = {
  lookup: {
    type: 'lookup',
    entity: 'users',
    label: 'Lookup',
    description: 'Lookup input',
    string: true,
    default: {
      logicalName: 'users',
      id: '1',
      name: 'John Doe',
    } as any,
  },
};

const multilookupAttributes: Record<string, MultiLookupAttribute> = {
  lookups: {
    type: 'lookups',
    entity: 'users',
    label: 'Multi Select Lookup',
    description: 'Multi Select Lookup input',
    string: true,
    default: [
      {
        logicalName: 'users',
        id: '1',
        name: 'John Doe',
      },
      {
        logicalName: 'users',
        id: '2',
        name: 'Alice Smith',
      },
    ] as any,
  },
};

const attributes: Record<string, Attribute> = {
  ...stringAttributes,
  ...numberAttributes,
  ...booleanAttributes,
  ...dateAttributes,
  ...dateRangeAttributes,
  ...choiceAttributes,
  ...choicesAttributes,
  ...moneyAttributes,
  ...attachmentAttributes,
  ...attachmentsAttributes,
  ...lookupAttributes,
  ...multilookupAttributes,
};

export default function Page() {
  const styles = useStyles();
  const [skeleton] = useState(false);

  const initialValues = useMemo(() => {
    const values: Record<string, any> = {};
    Object.entries(attributes).forEach(([key, attribute]) => {
      values[key] = attribute.default;
    });
    return values;
  }, []);

  const form = useForm({
    defaultValues: initialValues,
    mode: 'onChange',
  });

  return (
    <ScrollView>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: tokens.spacingHorizontalM,
        }}
      >
        <Table className={styles.table}>
          <colgroup>
            <col />
            <col style={{ width: 160 }} />
            <col />
          </colgroup>
          <TableBody>
            {Object.entries(attributes).map(([key, attribute]) => (
              <TableRow key={key}>
                <TableCell>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Body1>{attribute.label}</Body1>
                    <Caption1 style={{ color: tokens.colorNeutralForeground3 }}>
                      {attribute.description}
                    </Caption1>
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: tokens.spacingVerticalXS,
                    }}
                  >
                    {/* <Badge appearance="tint">{attribute.type}</Badge>
                    {'format' in attribute && (
                      <Badge appearance="tint" color="severe">
                        {attribute.format}
                      </Badge>
                    )} */}
                    <Caption1>
                      <span>Data Type: {attribute.type}</span>
                    </Caption1>
                    {'format' in attribute && (
                      <Caption1
                        style={{ color: tokens.colorNeutralForeground2 }}
                      >
                        <span>Formate: {attribute.format}</span>
                      </Caption1>
                    )}
                  </div>
                </TableCell>
                <Controller
                  name={key}
                  control={form.control}
                  render={({ field }) => (
                    <TableCell
                      style={{ paddingBlock: tokens.spacingVerticalS }}
                    >
                      <StandardControl
                        attribute={attribute}
                        name={key}
                        value={field.value}
                        onChange={field.onChange}
                        skeleton={skeleton}
                      />
                    </TableCell>
                  )}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ScrollView>
  );
}
