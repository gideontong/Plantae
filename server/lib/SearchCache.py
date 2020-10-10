'''
Caches responses from the Trefle API.
'''

from collections import OrderedDict as better_dict

class SearchCache:
    def __init__(self, max_size: int):
        self.cache = better_dict()
        self.max_size = max_size

    def add(self, key: str, data: dict) -> int:
        '''
        Adds an entry to the cache. Returns size of cache.
        '''
        self.auto_evict()
        self.cache[key] = data

    def get(self, key: str) -> dict:
        '''
        Gets an item from the cache.
        '''
        if key in self.cache:
            return self.cache[key]
        else:
            return {}

    def has(self, key: str) -> bool:
        return key in self.cache

    def size_of(self, key: str) -> int:
        '''
        Get number of results in cache.
        '''
        if key in self.cache and 'data' in self.cache[key]:
            return len(self.cache[key]['data'])
        else:
            return 0

    def evict(self, key: str) -> dict:
        '''
        Evicts an entry from the cache. Returns the evicted entry.
        '''
        del self.cache[key]

    def auto_evict(self) -> int:
        '''
        Evicts old entries from the cache with a condition is hit. Returns number of entries evicted.
        '''
        count = 0
        while len(self.cache) > self.max_size:
            self.cache.popitem(last=False)
            count += 1
        return count

    def size(self) -> int:
        '''
        Returns size of cache.
        '''
        return len(self.cache)