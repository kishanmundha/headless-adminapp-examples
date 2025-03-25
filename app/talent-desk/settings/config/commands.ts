import { DefaultCommandBuilder } from '@headless-adminapp/app/builders/CommandBuilder/DefaultCommandBuilder';
import { iconSet } from '@headless-adminapp/icons-fluent';
import { FormCommandBuilder } from '@headless-adminapp/app/builders/CommandBuilder/FormCommandBuilder';

export const commands = [
  [
    FormCommandBuilder.createSaveCommand({
      Icon: iconSet.Save,
      text: DefaultCommandBuilder.defaultFormCommandStrings.save,
    }),
  ],
];
