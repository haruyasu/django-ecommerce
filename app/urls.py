from django.urls import path
from app import views

urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('order/', views.OrderView.as_view(), name='order'),
    path('product/<slug>', views.ItemDetailView.as_view(), name='product'),
    path('additem/<slug>', views.addItem, name='additem'),
    path('removeitem/<slug>', views.removeItem, name='removeitem'),
    path('removesingleitem/<slug>', views.removeSingleItem, name='removesingleitem'),
    path('payment/', views.PaymentView.as_view(), name='payment'),
]
