from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('books/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('books/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('books/', include('books.urls')),
]
