import { CatalogItem } from '@console/plugin-sdk';
import * as _ from 'lodash';
import { keywordCompare } from './catalog-utils';
import { CatalogFilters } from './types';

export const filterByGroup = (items: CatalogItem[], filters): Record<string, CatalogItem[]> => {
  // Filter items by each filter group
  return _.reduce(
    filters,
    (filtered, group, key) => {
      // Only apply active filters
      const activeFilters = _.filter(group, 'active');
      if (activeFilters.length) {
        const values = _.reduce(
          activeFilters,
          (filterValues, filter) => {
            filterValues.push(filter.value, ..._.get(filter, 'synonyms', []));
            return filterValues;
          },
          [],
        );

        filtered[key] = _.filter(items, (item) => {
          const filterValue = item[key] || item.attributes?.[key];
          if (Array.isArray(filterValue)) {
            return filterValue.some((f) => values.includes(f));
          }
          return values.includes(filterValue);
        });
      }

      return filtered;
    },
    {},
  );
};

export const filterByAttributes = (
  items: CatalogItem[],
  filters: CatalogFilters,
): CatalogItem[] => {
  if (_.isEmpty(filters)) {
    return items;
  }

  // Apply each filter property individually. Example:
  //  filteredByGroup = {
  //    provider: [/*array of items filtered by provider*/],
  //    healthIndex: [/*array of items filtered by healthIndex*/],
  //  };
  const filteredByGroup = filterByGroup(items, filters);

  // Intersection of individually applied filters is all filters
  // In the case no filters are active, returns items filteredByKeyword
  return [..._.values(filteredByGroup), items].reduce((a, b) => a.filter((c) => b.includes(c)));
};

export const filterBySearchKeyword = (
  items: CatalogItem[],
  searchKeyword: string,
): CatalogItem[] => {
  return searchKeyword ? items.filter((item) => keywordCompare(searchKeyword, item)) : items;
};

export const filterByCategory = (
  items: CatalogItem[],
  categoryId: string,
  categorizedIds: Record<string, string[]>,
): CatalogItem[] => {
  return categoryId !== 'all'
    ? items.filter((item) => categorizedIds[categoryId]?.includes(item.uid))
    : items;
};

export const determineAvailableFilters = (initialFilters, items, filterGroups): CatalogFilters => {
  const filters = _.cloneDeep(initialFilters);

  _.each(filterGroups, (field) => {
    _.each(items, (item) => {
      const value = item[field] || item.attributes?.[field];
      if (value) {
        _.set(filters, [field, value], {
          label: value,
          value,
          active: false,
        });
      }
    });
  });

  return filters;
};

export const getActiveFilters = (
  attributeFilters,
  activeFilters,
  storeFilterKey = null,
  filterRetentionPreference = null,
): CatalogFilters => {
  const userFilters = storeFilterKey ? localStorage.getItem(storeFilterKey) : null;

  if (userFilters) {
    try {
      const lastFilters = JSON.parse(userFilters);
      if (lastFilters) {
        if (filterRetentionPreference) {
          _.each(filterRetentionPreference, (filterGroup) => {
            if (!attributeFilters || !attributeFilters[filterGroup]) {
              if (lastFilters[filterGroup]) {
                activeFilters[filterGroup] = lastFilters[filterGroup];
              }
            }
          });
        }
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Failed parsing user filter settings.');
    }
  }

  _.forOwn(attributeFilters, (filterValues, filterType) => {
    // removing default and localstore filters if Filters are present over URL
    _.each(_.keys(activeFilters[filterType]), (key) =>
      _.set(activeFilters, [filterType, key, 'active'], false),
    );
    _.each(filterValues, (filterValue) => {
      _.set(activeFilters, [filterType, filterValue, 'active'], true);
    });
  });

  return activeFilters;
};

export const updateActiveFilters = (
  activeFilters: CatalogFilters,
  filterType: string,
  id: string,
  value: boolean,
) => {
  _.set(activeFilters, [filterType, id, 'active'], value);

  return activeFilters;
};

export const clearActiveFilters = (
  activeFilters: CatalogFilters,
  filterGroups: string[],
): CatalogFilters => {
  // Clear the group filters
  _.each(filterGroups, (field) => {
    _.each(_.keys(activeFilters[field]), (key) =>
      _.set(activeFilters, [field, key, 'active'], false),
    );
  });

  return activeFilters;
};

export const getFilterGroupCounts = (
  items: CatalogItem[],
  activeFilters: CatalogFilters,
  filterGroups: string[],
) => {
  const newFilterCounts = {};

  if (_.isEmpty(activeFilters)) {
    return newFilterCounts;
  }

  _.each(filterGroups, (filterGroup) => {
    _.each(_.keys(activeFilters[filterGroup]), (key) => {
      const filterValues = [
        _.get(activeFilters, [filterGroup, key, 'value']),
        ..._.get(activeFilters, [filterGroup, key, 'synonyms'], []),
      ];

      const matchedItems = _.filter(items, (item) => {
        const filterValue = item[filterGroup] || item.attributes?.[filterGroup];
        if (Array.isArray(filterValue)) {
          return filterValue.some((f) => filterValues.includes(f));
        }

        return filterValues.includes(filterValue);
      });

      _.set(newFilterCounts, [filterGroup, key], _.size(matchedItems));
    });
  });

  return newFilterCounts;
};

export const getFilterSearchParam = (groupFilter) => {
  const activeValues = _.reduce(
    _.keys(groupFilter),
    (result, typeKey) => {
      return groupFilter[typeKey].active ? result.concat(typeKey) : result;
    },
    [],
  );

  return _.isEmpty(activeValues) ? '' : JSON.stringify(activeValues);
};
