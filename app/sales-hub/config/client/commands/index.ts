import { DefaultCommandBuilder } from '@headless-adminapp/app/builders/CommandBuilder/DefaultCommandBuilder';
import { iconSet } from '@headless-adminapp/icons-fluent';

export const commands = DefaultCommandBuilder.createDefaultCommands({
  icons: {
    Delete: iconSet.Delete,
    Edit: iconSet.Edit,
    View: iconSet.Edit,
    Export: iconSet.Export,
    ExportCsv: iconSet.ExportCsv,
    ExportExcel: iconSet.ExportExcel,
    New: iconSet.Add,
    Refresh: iconSet.Refresh,
    Save: iconSet.Save,
    SaveAndClose: iconSet.Save,
  },
});
