import { defineType, defineField } from 'sanity';

export const update = defineType({
  name: 'update',
  title: 'Update',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (web address)',
      type: 'slug',
      description: 'Click "Generate" — this becomes the page URL.',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Short summary',
      type: 'text',
      rows: 3,
      description: 'One or two sentences shown on the card.',
      validation: (r) => r.required().max(220),
    }),
    defineField({
      name: 'cover',
      title: 'Cover photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Main image for the post. (Skipped if a video is added.)',
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube video ID (optional)',
      type: 'string',
      description:
        'Just the ID from the URL. Example: for youtube.com/watch?v=ABC123, enter ABC123.',
    }),
    defineField({
      name: 'body',
      title: 'Story',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'The full write-up. Add headings, bold, links, etc.',
    }),
    defineField({
      name: 'gallery',
      title: 'Photo gallery (optional)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      options: { layout: 'grid' },
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'date', media: 'cover' },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : '',
        media,
      };
    },
  },
});
