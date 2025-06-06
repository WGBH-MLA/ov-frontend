export default {
  search_attributes: [
    { field: 'title', weight: 3 },
    'slug',
    'exhibits_exhibitpage__body_edgengrams',
    'ov_collections_collection__introduction_edgengrams',
  ],
  result_attributes: [
    'title',
    'slug',
    'exhibits_exhibitpage__body_edgengrams',
    'ov_collections_collection__introduction_edgengrams',
    'exhibits_exhibitpage__get_hero_thumb_url',
    'ov_collections_collection__get_hero_thumb_url',
  ],
  highlight_attributes: ['title'],
  snippet_attributes: [
    'exhibits_exhibitpage__body_edgengrams:40',
    'ov_collections_collection__introduction_edgengrams:40',
  ],
  facet_attributes: [
    { attribute: 'content_type', field: 'content_type', type: 'string' },
    {
      attribute: 'featured',
      field: 'exhibits_exhibitpage__featured_filter',
      type: 'boolean',
    },
  ],
  filter_attributes: [
    {
      attribute: 'live',
      field: 'live_filter',
      type: 'boolean',
    },
    {
      attribute: 'id',
      field: 'id_filter',
      type: 'numeric',
    },
  ],

  sorting: {
    default: {
      field: '_score',
      order: 'desc',
    },
    _last_published_date_desc: {
      field: 'last_published_at_filter',
      order: 'desc',
    },
    _last_published_date_asc: {
      field: 'last_published_at_filter',
      order: 'asc',
    },
    _title_asc: {
      field: 'title_filter',
      order: 'asc',
    },
    _title_desc: {
      field: 'title_filter',
      order: 'desc',
    },
    _seriestitle_asc: {
      field: 'title.keyword',
      order: 'asc',
    },
    _seriestitle_desc: {
      field: 'title.keyword',
      order: 'desc',
    },
  },
}
