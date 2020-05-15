from django import template
from app.models import Order

register = template.Library()

@register.filter
def itemCount(user):
    if user.is_authenticated:
        order = Order.objects.filter(user=user, ordered=False)
        if order.exists():
            return order[0].items.count()
    return 0
