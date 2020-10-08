'''
Caches responses from the Trefle API.
'''

class SearchCache:
    def __init__(self):
        self.cache = {}

    def add(self, key: str, data: dict) -> int:
        '''
        Adds an entry to the cache. Returns size of cache.
        '''
        pass

    def get(self, key: str) -> dict:
        '''
        Gets an item from the cache.
        '''
        pass

    def evict(self, key: str) -> dict:
        '''
        Evicts an entry from the cache. Returns the evicted entry.
        '''
        pass

    def auto_evict(self, key: str) -> int:
        '''
        Evicts old entries from the cache with a condition is hit. Returns number of entries evicted.
        '''
        pass

    def size(self) -> int:
        '''
        Returns size of cache.
        '''
        return len(self.cache)