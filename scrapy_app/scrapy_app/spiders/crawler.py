# -*- coding: utf-8 -*-
import scrapy
from scrapy.spiders import CrawlSpider
from scrapy.http import Request

from .. import items


class CrawlerSpider(CrawlSpider):
    name = 'crawler'

    def __init__(self, *args, **kwargs):
        super(CrawlerSpider, self).__init__(*args, **kwargs)
        self.url = kwargs.get('url')
        self.domain = kwargs.get('domain')
        self.start_urls = [self.url]
        # self.start_urls = [kwargs.get('start_url')]

    def parse(self, response):
        revs = response.xpath('//*[@id="reviews-medley-footer"]/div[2]/a/@href').extract_first()
        absolute_url = response.urljoin(revs)
        yield Request(absolute_url, callback=self.parse_reviews, dont_filter=True)

    def parse_reviews(self, response):
        item = items.ScrapyAppItem()

        reviewTitles = response.xpath('//a[@data-hook="review-title"]/span/text()').extract()
        starRatings = response.xpath('//span[@class="a-icon-alt"]/text()').extract()[3:13]
        reviews = response.xpath('//span[@data-hook="review-body"]/span[descendant-or-self::text()]').xpath('string()').extract()

        for (reviewTitle,starRating,review) in zip(reviewTitles,starRatings,reviews):
            #yield {'ReviewTitles': reviewTitle, 'StarRating': starRating, 'Review': review}
            item['title'] = reviewTitle
            item['rating'] = starRating
            item['review'] = review

            yield item

        next_page_url = response.xpath('//*[@id="cm_cr-pagination_bar"]/ul/li[2]/a/@href').extract_first()
        absolute_next_page_url = response.urljoin(next_page_url)
        yield Request(absolute_next_page_url, dont_filter=True)

