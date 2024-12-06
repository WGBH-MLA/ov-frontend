export default {
  connection: {
    host: 'https://elastic.wgbh-mla.org',
    apiKey: 'X3NoUXlJMEJZNE9yTDhJMHdMSEQ6N1RLcDQxYm9USEdCV1ByeXJ4MXFDUQ==',
  },
  search_settings: {
    search_attributes: [
      { field: 'title', weight: 3 },
      'slug',
      'exhibits_exhibitpage__body_edgengrams',
      'ov_collections_collection__introduction_edgengrams',
      'featured',
    ],
    result_attributes: [
      'title',
      'slug',
      'exhibits_exhibitpage__body_edgengrams',
      'ov_collections_collection__introduction_edgengrams',
    ],
    highlight_attributes: ['title'],
    snippet_attributes: [
      'exhibits_exhibitpage__body_edgengrams:40',
      'ov_collections_collection__introduction_edgengrams:40',
    ],
    facet_attributes: [
      { attribute: 'content_type', field: 'content_type', type: 'string' },
    ],
    filter_attributes: [
      {
        attribute: 'featured',
        field: 'exhibits_exhibitpage__featured_filter',
        type: 'string',
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
  },
}
