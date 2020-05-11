from django.urls import path
from app import views

urlpatterns = [
    # path('', views.IndexView.as_view(), name='index'),
    path('', views.HomeView.as_view(), name='home'),
    path('order-summary/', views.OrderSummaryView.as_view(), name='order-summary'),
    path('product/<slug>', views.ItemDetailView.as_view(), name='product'),
    path('add-to-cart/<slug>', views.add_to_cart, name='add-to-cart'),
    path('remove-from-cart/<slug>', views.remove_from_cart, name='remove-from-cart'),
]
