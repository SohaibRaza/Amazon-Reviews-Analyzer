# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html

from pydispatch import dispatcher
from scrapy import signals

from main.models import ScrapyItem
import json


class ScrapyAppPipeline(object):
    def __init__(self, unique_id, *args, **kwargs):
        self.unique_id = unique_id
        self.items = []
        dispatcher.connect(self.spider_closed, signals.spider_closed)

    @classmethod
    def from_crawler(cls, crawler):
        return cls(
            unique_id=crawler.settings.get('unique_id'),
        )
    # def open_spider(self, spider):
    #     self.file = open('items.csv', 'w')

    # def close_spider(self, spider):
    #     self.file.close()

    # def process_item(self, item, spider):
    #     print(item.reviews)

    #     line = json.dumps(dict(item)) + "\n"
    #     self.file.write(line)
    #     return item
    def process_item(self, item, spider):
        #print("PIPELINE:>>> " + item['title'][0])
        scrapy_item = ScrapyItem()
        scrapy_item.unique_id = self.unique_id

        scrapy_item.title = json.dumps(item['title'])
        scrapy_item.rating = json.dumps(item['rating'])
        scrapy_item.review = json.dumps(item['review'])

        scrapy_item.save()
        return item

    def spider_closed(self, spider):
        print('SPIDER FINISHED!')
