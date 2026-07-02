import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {CalendarIcon, ClockIcon, SyncIcon} from '@sanity/icons'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'ZR Team Slovakia',

  projectId: '7wvqvm3e',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Events')
              .icon(CalendarIcon)
              .child(S.documentTypeList('event').title('Events')),
            S.listItem()
              .title('Recurring Events')
              .icon(SyncIcon)
              .child(S.documentTypeList('recurringEvent').title('Recurring Events')),
            S.listItem()
              .title('Schedule')
              .icon(ClockIcon)
              .child(S.documentTypeList('scheduleEntry').title('Class Schedule')),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) =>
                !['event', 'recurringEvent', 'scheduleEntry'].includes(item.getId() ?? ''),
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
