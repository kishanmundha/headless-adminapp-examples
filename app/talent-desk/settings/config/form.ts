import { SchemaExperienceBuilder } from '@headless-adminapp/app/builders';
import { SettingAttributes, settingSchema } from './schema';
import { Form } from '@headless-adminapp/core/experience/form';

const builder = new SchemaExperienceBuilder(settingSchema);

const formExperience = builder.defineFormExperience({
  includeAttributes: ['name'],
  tabs: [
    {
      name: 'general',
      label: 'General',
      controls: ['notification'],
    },
  ],
});

export const form: Form<SettingAttributes> = {
  id: 'settings',
  name: 'Settings',
  logicalName: settingSchema.logicalName,
  experience: formExperience,
};
