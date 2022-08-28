from django.urls import path
from . import views
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import(
    TokenRefreshView
)

urlpatterns = [
    path('', views.Product_Names),
    path('product-details/<int:pk>', views.Product_Details),
    path('product-detail', views.Product_Details_All),
    path('create-product', views.create_product),
    path('update-product/<int:pk>', views.Product_Update),
    path('delete-product/<int:pk>', views.Product_Delete),
    path('all_inv', views.Get_inv),
    path('create-inv', views.create_inv),
    path('update-inv/<int:pk>', views.inv_Update),
    path('delete-inv/<int:pk>', views.inv_Delete),
    path('latest_inv', views.Get_inv_latest),
    path('inv-details/<int:pk>', views.Get_inv_Details),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(),
         name='token_obtain_pair'),
]
