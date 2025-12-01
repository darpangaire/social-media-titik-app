from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class PostPaginator(PageNumberPagination):
    page_size = 10

    def get_paginated_response(self, data):
        return Response({
            "results": data,
            "next_page": self.page.next_page_number() if self.page.has_next() else None,
            "previous_page": self.page.previous_page_number() if self.page.has_previous() else None,
        })


    
    
    
    