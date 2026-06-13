import { defineType, defineField } from 'sanity';

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'start',
      title: 'Starts',
      type: 'datetime',
      options: { timeStep: 15 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'end',
      title: 'Ends (optional)',
      type: 'datetime',
      options: { timeStep: 15 },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. "Lincoln Park" or "Zoom".',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'cover',
      title: 'Image (optional)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'rsvpUrl',
      title: 'RSVP / details link (optional)',
      type: 'url',
    }),
  ],
  orderings: [
    {
      title: 'Soonest first',
      name: 'startAsc',
      by: [{ field: 'start', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'start', media: 'cover' },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toLocaleString() : '',
        media,
      };
    },
  },
});
