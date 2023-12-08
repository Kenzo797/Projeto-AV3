from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookViewSet, custom_view

router = DefaultRouter()
router.register(r'books', BookViewSet, basename='book')

urlpatterns = [
    path('api/', include(router.urls)),
    path('custom/', custom_view),
]